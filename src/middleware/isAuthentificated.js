import jwt from "jsonwebtoken";
import config from "../config/index.js";

const isAuthenticated = async (ctx, next) => {
    const apiRoutes = [ '/api/login', '/api/register', '/api/logout', '/api/refresh', '/swagger' ];
    if(apiRoutes.includes(ctx.request.url) || ctx.request.url.startsWith('/assets/')) {
        await next();
        return;
    }
    const token = ctx.header.authorization != null ? ctx.header.authorization.split(" ")[1] : null;
    if (!token) {
        return ctx.status = 403;
    }


    let jwtRetour = null;
    try {
        jwtRetour = jwt.verify(token, config.secretToken);
    } catch (err) {
        return ctx.status = 401;
    }
    if(jwtRetour) {
      ctx.userId = jwtRetour.userId;
      await next();
    }

}


export default isAuthenticated;
