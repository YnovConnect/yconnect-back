import Router from "koa-router";
import messageController from "../controllers/messageController.js";

const router = new Router();

/**
 * @swagger
 * /rooms/:id/messages:
 *   get:
 *     summary: Get all messages in a room.
 *     tags:
 *       - Messages
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the room.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A list of messages in the room.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                    type: string
 *                   content:
 *                     type: string
 *                   user:
 *                     type: object
 *                   createdAt:
 *                    type: date
 */
router.get("/", messageController.getAllMessages);
router.post("/", messageController.createMessages);
router.get("/:messageId", messageController.getMessagesById);
router.put("/:messageId", messageController.updateMessagesById);
router.delete("/:messageId", messageController.deleteMessagesById);

export default router;
