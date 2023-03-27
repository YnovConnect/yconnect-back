import Router from "koa-router";
import uploadFileController from "../controllers/uploadFileController.js";

const router = new Router();

// Récupération de tous les utilisateurs
router.get("/", uploadFileController.uploadImageProfile);

export default router;
