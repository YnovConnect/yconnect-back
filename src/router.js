import userRoute from "./routes/user.js";
import authentificationRoute from "./routes/authentification.js";
import roomRoute from "./routes/room.js";
import messageRoute from "./routes/message.js";
import Router from "koa-router";
import uploadFile from "./routes/uploadFile.js";

const router = new Router();

router.get("/", async (ctx) => {
  ctx.body = "Hello World!";
});

router.use("/api/users", userRoute.routes());
router.use("/api", authentificationRoute.routes());
router.use("/api/upload", uploadFile.routes());
router.use("/api/rooms", roomRoute.routes());
router.use("/api/rooms/:id/messages", messageRoute.routes());

export default router;
