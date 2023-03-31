import Message from "../models/message.js";
import Room from "../models/room.js";
import { io } from "../config/server.js";

const messageController = {
  // Create message in a room
  async createMessages(ctx) {
    try {
      const room = await Room.findById(ctx.params.id)


      if (!room) {
        ctx.throw(404, "Room not found");
      }
      const message = new Message(ctx.request.body);

      room.messages.push(message);

      await room.save();
      await message.save();

      // recherche le message dans la base de donnée et popule les fichiers
      let messageWithFile = await Message.findById(message._id).populate('user')
          .populate('files');

      io.to(room._id.toString()).emit("message", {
        roomId: room._id.toString(),
        message: messageWithFile,
      });

      ctx.status = 201;
      ctx.body = messageWithFile;
    } catch (err) {
      ctx.throw(err.status || 500, err.message);
    }
  },

  // Get all messages in a room
  async getAllMessages(ctx) {
    try {
      const room = await Room.findById(ctx.params.id).populate({
        path: 'messages',
        populate: [
          { path: 'user' },
          { path: 'files' }
        ]
      });
      if (!room) {
        ctx.throw(404, "Room not found");
      }
      ctx.status = 200;
      ctx.body = room.messages;
    } catch (err) {
      ctx.throw(err.status || 500, err.message);
    }
  },

  // Get a single message in a room by ID
  async getMessagesById(ctx) {
    try {
      const room = await Room.findById(ctx.params.id).populate({
        path: "messages",
        populate: [
          { path: "User" }, // peupler l'objet "user"
          { path: "files" } // peupler l'objet "files"
        ]
      });
      if (!room) {
        ctx.throw(404, "Room not found");
      }
      const message = await Message.findById(ctx.params.messageId);
      if (!message) {
        ctx.throw(404, "Message not found");
      }
      ctx.status = 200;
      ctx.body = message;
    } catch (err) {
      ctx.throw(err.status || 500, err.message);
    }
  },

  // Update a message in a room by ID
  async updateMessagesById(ctx) {
    try {
      const room = await Room.findById(ctx.params.id).populate({
        path: "messages",
        populate: {
          path: "files"
        }
      });
      if (!room) {
        ctx.throw(404, "Room not found");
      }
      const message = await Message.findByIdAndUpdate(
        ctx.params.messageId,
        ctx.request.body,
        {
          new: true,
          runValidators: true,
        }
      );
      if (!message) {
        ctx.throw(404, "Message not found");
      }
      ctx.status = 200;
      ctx.body = message;
    } catch (err) {
      ctx.throw(err.status || 500, err.message);
    }
  },

  // Delete a message in a room by ID
  async deleteMessagesById(ctx) {
    try {
      const room = await Room.findById(ctx.params.id).populate("messages");
      if (!room) {
        ctx.throw(404, "Room not found");
      }
      const message = await Message.findByIdAndDelete(ctx.params.messageId);
      if (!message) {
        ctx.throw(404, "Message not found");
      }
      ctx.status = 204;
    } catch (err) {
      ctx.throw(err.status || 500, err.message);
    }
  },
};

export default messageController;
