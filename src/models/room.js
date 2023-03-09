import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  userCreate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  privateRoom: {
    type: Boolean,
    required: true,
  },
  description: {
    type: String,
  },
});

const Room = mongoose.model("Room", roomSchema);

export default Room;
