import userRoute from "./routes/user.js";
import Router from "koa-router";

const router = new Router();

router.get("/", async (ctx) => {
  ctx.body = "Hello World!";
});

// const router = new Router({ prefix: "/users" });

router.use("/users", userRoute.routes());

export default router;
