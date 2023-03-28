import mongoose from "mongoose";


const fileSchema = new mongoose.Schema({
    originalName: {
        type: String,
        required: false,
    },
    fileName: {
        type: String,
        required: true,
    },
    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "rooms",
        required: false,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    type: {
        type: String,
        required: false,
        default: "file",
    },
    createdDate: { type: Date, default: Date.now },
});

export default mongoose.model("File", fileSchema);
