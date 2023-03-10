import userRoute from "./routes/user.js";
import authentificationRoute from "./routes/authentification.js";
import roomRoute from "./routes/room.js";
import messageRoute from "./routes/message.js";
import Router from "koa-router";

const router = new Router();

router.get("/", async (ctx) => {
  ctx.body = "Hello World!";
});

router.use("/users", userRoute.routes());
router.use("/api", authentificationRoute.routes());
router.use("/rooms", roomRoute.routes());
router.use("/rooms/:id/messages", messageRoute.routes());

export default router;
