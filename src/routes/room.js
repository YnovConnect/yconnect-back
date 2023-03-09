import Router from "koa-router";
import roomController from "../controllers/roomController.js";

const router = new Router();

router.get("/", roomController.getAllRooms);
router.post("/", roomController.createRooms);
router.get("/:id", roomController.getRoomsById);
router.put("/:id", roomController.updateRoomsById);
router.delete("/:id", roomController.deleteRoomsById);

export default router;
