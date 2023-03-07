import Router from "koa-router";
import authentificationController from "../controllers/authentificationController.js";

const router = new Router();

// Récupération de tous les utilisateurs
router.post("/register", authentificationController.register);

router.post("/login", authentificationController.login);

export default router;
