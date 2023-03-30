import File from "../models/file.js";
import Room from "../models/room.js";
import fs from "fs";


const uploadController = {
    async uploadFile (ctx) {
        try {

            const audio = ctx.request.body.audio;
            const duration = ctx.request.body.duration;
            const {originalname, mimetype, filename, size } = ctx.request.file;
            const type = mimetype.split("/")[1];
            const url = '/assets/' + filename;
            const createdBy = ctx.userId;
            const newFile = await File.create({
                name: originalname,
                size: size,
                type: type,
                audio: audio,
                duration: duration,
                url: url,
                fileName: filename,
                createdBy: createdBy,
            });
            ctx.body = {
                file: newFile
            };
        } catch (err) {
            console.log('err: ', err);
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
