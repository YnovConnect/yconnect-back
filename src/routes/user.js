import Router from "koa-router";
import userController from "../controllers/userController.js";

const router = new Router();

// Récupération de tous les utilisateurs

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: CRUD operations for user accounts
 */

/**
 * @swagger
 *  /api/users:
 *    get:
 *      summary: Récupération de tous les utilisateurs.
 *      tags:
 *        - Users
 *      responses:
 *        200:
 *          description: Liste de tous les utilisateurs
 */
router.get("/", userController.getAllUsers);

/**
 * @swagger
 *  /api/users/{id}:
 *    get:
 *      summary: Récupération d'un utilisateur par ID.
 *      tags:
 *        - Users
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID de l'utilisateur
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Utilisateur trouvé
 *        404:
 *          description: Utilisateur non trouvé
 */
// Récupération d'un utilisateur par son identifiant
router.get("/:id", userController.getUserById);

/**
 * @swagger
 *  /api/users:
 *    post:
 *      summary: Création d'un utilisateur.
 *      tags:
 *        - Users
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: body
 *          name: user
 *          description: Données de l'utilisateur à créer.
 *          schema:
 *            type: object
 *            required:
 *              - lastname
 *              - firstname
 *              - email
 *              - password
 *            properties:
 *              lastname:
 *                type: string
 *              firstname:
 *                type: string
 *              email:
 *                type: string
 *              password:
 *                type: string
 *              birthday:
 *                type: string
 *                format: date
 *      responses:
 *        201:
 *          description: Utilisateur créé avec succès
 *        400:
 *          description: Erreur de validation
 *        500:
 *          description: Erreur interne du serveur
 */
// Création d'un utilisateur
router.post("/", userController.createUser);

// Mise à jour d'un utilisateur
/**
 * @swagger
 *  /api/users/{id}:
 *    put:
 *      summary: Mise à jour d'un utilisateur par ID.
 *      tags:
 *        - Users
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID de l'utilisateur
 *          schema:
 *            type: string
 *        - in: body
 *          name: user
 *          description: Données de l'utilisateur à mettre à jour.
 *          schema:
 *            type: object
 *            required:
 *              - lastname
 *              - firstname
 *              - email
 *              - password
 *            properties:
 *              lastname:
 *                type: string
 *              firstname:
 *                type: string
 *              email:
 *                type: string
 *              password:
 *                type: string
 *              birthday:
 *                type: string
 *                format: date
 *      responses:
 *        200:
 *          description: Utilisateur mis à jour avec succès
 *        404:
 *          description: Utilisateur non trouvé
 *        500:
 *          description: Erreur interne du serveur
 */
router.put("/:id", userController.updateUser);

// Suppression d'un utilisateur
/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Supprime un utilisateur par son identifiant.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Identifiant de l'utilisateur à supprimer.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: L'utilisateur a été supprimé avec succès.
 *       404:
 *         description: L'utilisateur avec l'identifiant spécifié n'a pas été trouvé.
 *       500:
 *         description: Erreur serveur lors de la suppression de l'utilisateur.
 */
router.delete("/:id", userController.deleteUser);

export default router;
