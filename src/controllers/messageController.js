import Message from "../models/message.js";
import Room from "../models/room.js";

const messageController = {
  // Create message in a room
  async createMessages(ctx) {
    try {
      const room = await Room.findById(ctx.params.id);

      if (!room) {
        ctx.throw(404, "Room not found");
      }

      const message = new Message(ctx.request.body);

      room.messages.push(message);

      await room.save();
      await message.save();
      ctx.status = 201;
      ctx.body = message;
    } catch (err) {
      ctx.throw(err.status || 500, err.message);
    }
  },

  // Get all messages in a room
  async getAllMessages(ctx) {
    try {
      const room = await Room.findById(ctx.params.id).populate("messages");
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
      const room = await Room.findById(ctx.params.id).populate("messages");
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
      const room = await Room.findById(ctx.params.id).populate("messages");
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
