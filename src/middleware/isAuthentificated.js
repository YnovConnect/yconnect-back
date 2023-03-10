import jwt from "jsonwebtoken";

const isAuthenticated = async (ctx, next) => {
    const token = ctx.cookies.get('yconnect_access_token');
    if(ctx.request.url === '/api/login'
        || ctx.request.url === '/api/register'
        || ctx.request.url === '/api/logout'
        || ctx.request.url === '/api/refresh'
        || ctx.request.url === '/swagger') {
        await next();
        return;
    }

    if (!token) {
        return ctx.status = 403;
    }

    jwt.verify(token,"my_secret_key", (err, decoded) => {
        if (err) {
            return ctx.status = 401;
        }
        ctx.userId = decoded.userId;

    });
    await next();
}


export default isAuthenticated;
