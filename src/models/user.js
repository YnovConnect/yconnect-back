import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  lastname: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    default: null,
  },
  isDeleted: {
    type: Date,
    default: null,
  },
});

export default mongoose.model("User", userSchema);
