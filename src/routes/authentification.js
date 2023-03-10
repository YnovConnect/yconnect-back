import Router from "koa-router";
import authentificationController from "../controllers/authentificationController.js";

const router = new Router();

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Enregistrement d'un nouvel utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 description: Prénom de l'utilisateur
 *               lastname:
 *                 type: string
 *                 description: Nom de l'utilisateur
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Adresse email de l'utilisateur
 *               password:
 *                 type: string
 *                 description: Mot de passe de l'utilisateur
 *               birthday:
 *                 type: string
 *                 format: date
 *                 description: Date de naissance de l'utilisateur
 *             required:
 *               - firstname
 *               - lastname
 *               - email
 *               - password
 *               - birthday
 *     responses:
 *       '200':
 *         description: Succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indique si l'enregistrement a réussi
 *                   example: true
 *       '400':
 *         description: Requête incorrecte
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Description de l'erreur survenue
 *                   example: "Le prénom est requis"
 *       '409':
 *         description: Conflit
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Description de l'erreur survenue
 *                   example: "Cet utilisateur existe déjà"
 */
router.post("/register", authentificationController.register);
/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Connectez-vous à l'application
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Adresse email de l'utilisateur.
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 description: Mot de passe de l'utilisateur.
 *                 example: "password123"
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: Connexion réussie.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indique si la connexion a réussi.
 *                   example: true
 *       '400':
 *         description: Requête invalide.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Message d'erreur.
 *                   example: "Adresse email ou mot de passe incorrect."
 */
router.post("/login", authentificationController.login);
/**
 * @swagger
 *
 * /api/logout:
 *   post:
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
