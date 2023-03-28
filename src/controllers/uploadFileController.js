import File from "../models/file.js";
import Room from "../models/room.js";
import fs from "fs";


const uploadController = {
    async uploadFile (ctx) {
        try {
            const {conversationId, type} = ctx.request.body;


            if(conversationId == null && type !== "avatar") {
                ctx.throw(400, "Conversation id is required ou type is not avatar");

            }

            if(conversationId != null ) {
                const room = await Room.findById(ctx.params.id);
                if (!room) {
                    ctx.throw(404, "room not found");
                }
                // todo check if user is part of the conversation
            }

            const {originalname, filename} = ctx.request.file;
            const createdBy = ctx.userId;
            const newFile = await File.create({
                originalName: originalname,
                fileName: filename,
                conversationId: conversationId,
                createdBy: createdBy,
                type:type
            });
            ctx.body = {
                file: newFile
            };
        } catch (err) {
            ctx.throw(err.status || 500, err.message);
        }
    },
    async getFileById(ctx) {
        const filename = ctx.params.idFile;
        if(!filename) {
            ctx.throw(400, "file id is required");
        }

        const file = await File.findById(filename);
        if (file == null) {
            ctx.throw(404, "file not found in database");
        }

        const filePath = `./uploads/${file.fileName}`;

        if (fs.existsSync(filePath)) {
            ctx.body = fs.createReadStream(filePath);
            ctx.attachment(file.originalName);
        } else {
            ctx.throw(404, "file not found in server");
        }
    }

}


export default uploadController;
