import { Context } from "koa";
import { validateToken } from "../lib/token";

const authMiddlewareAsync = async (ctx: Context, next) => {
  const token = ctx.request.header.authorization?.split('Bearer ')[1] ?? ctx.cookies.get('access_token');
  
  if (ctx.cookies.get('refresh_token') && !token) {
    return;
  }

  if (!token) return;

  try {
    const decoded = await validateToken(token);
    ctx.request.user = decoded;
    ctx.body = {
      status: 200,
      data: ctx.request.user
    }
  } catch (e: any) {
    console.log(e)
  }
}

export default authMiddlewareAsync;