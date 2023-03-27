import Router from "koa-router";
import authentificationController from "../controllers/authentificationController.js";

const router = new Router();

/**
 * @swagger
 *  /api/register:
 *    post:
 *      summary: Inscription utilisateur.
 *      consumes:
 *        - application/json
 *      tags:
 *        - Authentification
 *      parameters:
 *        - in: body
 *          name: user
 *          description: The user to create.
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
 *                  type: string
 *              password:
 *                  type: string
 *      responses:
 *        201:
 *          description: New user created!
 */
router.post("/register", authentificationController.register);
/**
 * @swagger
 *  /api/login:
 *    post:
 *      summary: Connexion utilisateur.
 *      consumes:
 *        - application/json
 *      tags:
 *        - Authentification
 *      parameters:
 *        - in: body
 *          name: user
 *          description: The user to create.
 *          schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *      responses:
 *        201:
 *          description: User logged in!
 */
router.post("/login", authentificationController.login);
/**
 * @swagger
 *
 * /api/logout:
 *   post:
 *     tags:
 *        - Authentification
 *     summary: Déconnexion de l'utilisateur.
 *     description: Déconnexion de l'utilisateur en supprimant le cookie d'accès à l'API.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Succès de la déconnexion.
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               description: Indique si la déconnexion a réussi.
 *               example: true
 *
 *
 */
router.post("/logout", authentificationController.logout);

export default router;
