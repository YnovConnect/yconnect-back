import userRoute from "./routes/user.js";
import authentificationRoute from "./routes/authentification.js";
import roomRoute from "./routes/room.js";
import messageRoute from "./routes/message.js";
import uploadFile from "./routes/uploadFile.js";
import Router from "koa-router";

const router = new Router();

router.get("/", async (ctx) => {
  ctx.body = "Hello World!";
});

router.use("/users", userRoute.routes());
router.use("/api", authentificationRoute.routes());
router.use("/api/upload", uploadFile.routes());
router.use("/rooms", roomRoute.routes());
router.use("/rooms/:id/messages", messageRoute.routes());

export default router;
