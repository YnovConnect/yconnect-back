import userRoute from "./routes/user.js";
import authentificationRoute from "./routes/authentification.js";
import roomRoute from "./routes/room.js";
import Router from "koa-router";

const router = new Router();

router.get("/", async (ctx) => {
  ctx.body = "Hello World!";
});

router.use("/users", userRoute.routes());
router.use("/api", authentificationRoute.routes());
router.use("/rooms", roomRoute.routes());

export default router;
