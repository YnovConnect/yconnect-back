import Router from "koa-router";
import multer from "@koa/multer";
import path from "path";
import uploadController from "../controllers/uploadFileController.js";
import File from "../models/file.js";
import fs from "fs";

const router = new Router();

// configuration de multer pour la gestion des uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        req.file= file;
        cb(null, "./uploads"); // dossier de stockage des fichiers uploadés
    },
    filename: async function (req, file, cb) {
        req.file= file;
        const extension = path.extname(file.originalname);
        const fileName = "file_" + Date.now() + extension.toLowerCase(); // nom de fichier unique avec le timestamp
        cb(null, fileName);
    },
});
const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // limite de taille des fichiers à 10 Mo
    fileFilter: function (req, file, cb) {
        req.file= file;
        const allowedMimes = [
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/bmp",
            "application/pdf",
            "audio/mpeg",
            "audio/wav",
        ];
        const allowedExtensions = [
            ".jpeg",
            ".jpg",
            ".pdf",
            ".gif",
            ".png",
            ".bmp",
            ".mp3",
            ".wav",
        ];
        const extension = path.extname(file.originalname).toLowerCase();

        if (
            !allowedExtensions.includes(extension) ||
            !allowedMimes.includes(file.mimetype)
        ) {
            return cb(new Error("Only pdf and image files are allowed!"));
        }
        cb(null, true);
    },
});


// route pour l'upload de fichiers
/**
 * @swagger
 * /api/upload:
 *   post:
 *     summary: Upload a file
 *     tags:
 *      - uploads
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: file
 *         type: file
 *         description: The file to upload. Must be a jpeg, jpg, png, gif, bmp, pdf, mp3, or wav file and be 10 MB or smaller.
 *       - in: formData
 *         name: conversationId
 *         type: string
 *         required: false
 *         description: The ID of the conversation the file belongs to.
 *       - in: formData
 *         name: type
 *         type: string
 *         required: false
 *         default: file
 *         description: The type of the file. Can be "file" or "avatar". Defaults to "file".
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 file:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: The ID of the file.
 *                     originalName:
 *                       type: string
 *                       description: The original name of the file.
 *                     fileName:
 *                       type: string
 *                       description: The name of the file on the server.
 *                     conversationId:
 *                       type: string
 *                       description: The ID of the conversation the file belongs to.
 *                     createdBy:
 *                       type: string
 *                       description: The ID of the user who uploaded the file.
 *                     type:
 *                       type: string
 *                       description: The type of the file. Can be "file" or "avatar".
 *                     createdDate:
 *                       type: string
 *                       description: The date the file was uploaded.
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.post("/", upload.single("file"), uploadController.uploadFile);
/**
 * @swagger
 * /api/upload/files/{idFile}:
 *   get:
 *     summary: Get a file by its ID
 *     tags:
 *      - uploads
 *     description: Retrieve a file from the server by its unique ID.
 *     parameters:
 *       - name: idFile
 *         in: path
 *         required: true
 *         description: The ID of the file to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The requested file
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Bad request, file ID is missing
 *       404:
 *         description: File not found
 */
router.get('/files/:idFile', uploadController.getFileById);

export default router;
