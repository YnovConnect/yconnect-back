import Router from "koa-router";
import userController from "../controllers/userController.js";

const router = new Router();

// Récupération de tous les utilisateurs
router.get("/", userController.getAllUsers);

// Récupération d'un utilisateur par son identifiant
router.get("/:id", userController.getUserById);

// Création d'un utilisateur
router.post("/", userController.createUser);

// Mise à jour d'un utilisateur
router.put("/:id", userController.updateUser);

// Suppression d'un utilisateur
router.delete("/:id", userController.deleteUser);

export default router;
