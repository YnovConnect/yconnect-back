import mongoose from "mongoose";
import Message from "./message.js";


const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
        required: false,
    },
    type: {
        type: String,
        required: false,
    },
    audio: {
        type: Boolean,
        required: false,
    },
    duration: {
        type: Number,
        required: false,
    },
    url: {
        type: String,
        required: true,
    },
    preview: {
        type: String,
        required: false,
    },
    fileName: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    createdDate: { type: Date, default: Date.now },
});

const File = mongoose.model("File", fileSchema);
export default File;
