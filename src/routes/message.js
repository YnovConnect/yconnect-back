import Router from "koa-router";
import messageController from "../controllers/messageController.js";

const router = new Router();

router.get("/", messageController.getAllMessages);
router.post("/", messageController.createMessages);
router.get("/:messageId", messageController.getMessagesById);
router.put("/:messageId", messageController.updateMessagesById);
router.delete("/:messageId", messageController.deleteMessagesById);

export default router;
