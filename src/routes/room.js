import Router from "koa-router";
import roomController from "../controllers/roomController.js";

const router = new Router();


/**
 * @swagger
 * /api/rooms:
 *   get:
 *     summary: Get all rooms with user creator populated.
 *     tags:
 *       - Salons
 *     responses:
 *       '200':
 *         description: A list of rooms with user creator populated.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   privateRoom:
 *                     type: boolean
 *                   description:
 *                     type: string
 *                   createdAt:
 *                     type: date
 */
router.get("/", roomController.getAllRooms);

/**
 * @swagger
 *  /api/rooms:
 *    post:
 *      summary: Créer un salon.
 *      consumes:
 *        - application/json
 *      tags:
 *        - Salons
 *      parameters:
 *        - in: body
 *          name: room
 *          description: Les informations du salon à créer.
 *          schema:
 *            type: object
 *            required:
 *              - name
 *              - userCreate
 *            properties:
 *              name:
 *                type: string
 *                description: Nom du salon.
 *              userCreate:
 *                type: string
 *                description: ID de l'utilisateur qui a créé le salon.
 *              privateRoom:
 *                type: boolean
 *                description: Indique si le salon est privé ou public. (optionnel)
 *              description:
 *                type: string
 *                description: Description du salon. (optionnel)
 *      responses:
 *        201:
 *          description: Salon créé avec succès!
 */
router.post("/", roomController.createRooms);

/**
 * @swagger
 *  /api/rooms/{id}:
 *    get:
 *      summary: Obtenir un salon en fonction de son ID.
 *      tags:
 *        - Salons
 *      parameters:
 *        - name: id
 *          in: path
 *          description: ID du salon à récupérer.
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        '200':
 *          description: Salon récupéré avec succès.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  _id:
 *                    type: string
 *                  name:
 *                    type: string
 *                    description: Nom du salon.
 *                  userCreate:
 *                    type: object
 *                    properties:
 *                      _id:
 *                        type: string
 *                      name:
 *                        type: string
 *                        description: Nom de l'utilisateur qui a créé le salon.
 *                  privateRoom:
 *                    type: boolean
 *                    description: Indique si le salon est privé ou public.
 *                  description:
 *                    type: string
 *                    description: Description du salon.
 */
router.get("/:id", roomController.getRoomsById);


/**
 * @swagger
 * /api/rooms/{id}:
 *   put:
 *     summary: Update a room by ID.
 *     tags:
 *       - Salons
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the room to update.
 *         required: true
 *         schema:
 *           type: string
 *       - name: room
 *         in: body
 *         description: The room to update.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             userCreate:
 *               type: string
 *             privateRoom:
 *               type: boolean
 *             description:
 *               type: string
 *     responses:
 *       '200':
 *         description: The updated room.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 userCreate:
 *                   type: string
 *                 privateRoom:
 *                   type: boolean
 *                 description:
 *                   type: string
 *                 createdAt:
 *                   type: date
 *                 updatedAt:
 *                   type: date
 */
router.put("/:id", roomController.updateRoomsById);

/**
 * @swagger
 * /api/rooms/{id}:
 *   delete:
 *     summary: Delete a room by ID.
 *     tags:
 *       - Salons
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the room.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Room deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 userCreate:
 *                   type: string
 *                 privateRoom:
 *                   type: boolean
 *                 description:
 *                   type: string
 *                 createdAt:
 *                   type: string
 */
router.delete("/:id", roomController.deleteRoomsById);
router.post("/:id/users", roomController.addUsersToRoom);
router.delete("/:id/users/:userId", roomController.removeUsersFromRoom);
export default router;
