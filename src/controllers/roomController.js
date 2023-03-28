import Room from "../models/room.js";

const roomController = {
  // Create a room
  async createRooms(ctx) {
    const { name, userCreate, privateRoom, description, idUsers } =
      ctx.request.body;
    try {
      const room = new Room({
        name,
        userCreate,
        privateRoom,
        description,
        idUsers,
      });

      await room.save();
      ctx.body = room;
    } catch (err) {
      ctx.throw(400, err.message);
    }
  },

  // Get all rooms
  async getAllRooms(ctx) {
    try {
      const rooms = await Room.find({}).populate("userCreate");
      ctx.body = rooms;
    } catch (err) {
      ctx.throw(400, err.message);
    }
  },
  // Get a single room by ID with user creator populated
  async getRoomsById(ctx) {
    try {
      const room = await Room.findById(ctx.params.id).populate("userCreate");
      if (!room) {
        ctx.throw(404, "room not found");
      }
      ctx.body = room;
    } catch (err) {
      ctx.throw(400, err.message);
    }
  },
  // Update a room by ID
  async updateRoomsById(ctx) {
    try {
      const room = await Room.findByIdAndUpdate(
        ctx.params.id,
        ctx.request.body,
        {
          new: true,
          runValidators: true,
        }
      );
      if (!room) {
        ctx.throw(404, "room not found");
      }
      ctx.body = room;
    } catch (err) {
      ctx.throw(400, err.message);
    }
  },

  // Delete a room by ID
  async deleteRoomsById(ctx) {
    try {
      const room = await Room.findByIdAndDelete(ctx.params.id);
      if (!room) {
        ctx.throw(404, "room not found");
      }
      ctx.body = room;
    } catch (err) {
      ctx.throw(400, err.message);
    }
  },

  // add users to a room
  async addUsersToRoom(ctx) {
    try {
      const room = await Room.findById(ctx.params.id);
      if (!room) {
        ctx.throw(404, "room not found");
      }
      const { idUsers } = ctx.request.body;
      room.idUsers.push(idUsers);
      await room.save();
      ctx.body = room;
    } catch (err) {
      ctx.throw(400, err.message);
    }
  },

  // remove users from a room
  async removeUsersFromRoom(ctx) {
    try {
      const room = await Room.findById(ctx.params.id);
      if (!room) {
        ctx.throw(404, "room not found");
      }
      const { idUsers } = ctx.request.body;
      room.idUsers.pull(idUsers);
      await room.save();
      ctx.body = room;
    } catch (err) {
      ctx.throw(400, err.message);
    }
  },
};

export default roomController;
