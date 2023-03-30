import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  files: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
      required: false,
    },
  ],
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
