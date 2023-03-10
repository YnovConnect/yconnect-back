import jwt from "jsonwebtoken";

const isAuthenticated = async (ctx, next) => {
    const token = ctx.cookies.get('yconnect_access_token');
    if(ctx.request.url === '/api/login' || ctx.request.url === '/api/register' || ctx.request.url === '/api/logout') {
        await next();
        return;
    }

    if (!token) {
        return res.status(403).json({message: "Unauthorized"});
    }

    jwt.verify(token,"my_secret_key", (err, decoded) => {
        if (err) {
            return res.status(401).json({message: "Unauthorized"});
        }
        ctx.userId = decoded.userId;

    });
    await next();
}


export default isAuthenticated;
