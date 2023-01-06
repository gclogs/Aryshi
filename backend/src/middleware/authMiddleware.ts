import jwt from 'jsonwebtoken'
import { Context } from "koa";
import { validateToken } from "../lib/token";

const { JsonWebTokenError } = jwt;

export const authMiddlewareAsync = async (ctx: Context, next) => {
  const token = ctx.request.header.authorization?.split('Bearer ')[1] ?? ctx.cookies.get('access_token');
  
  if (ctx.cookies.get('refresh_token') && !token) {
    return;
  }

  if (!token) return;

  try {
    const decoded = await validateToken(token);
  } catch (e: any) {
    if (e instanceof JsonWebTokenError) {
      console.log(e)
    }
  }
}