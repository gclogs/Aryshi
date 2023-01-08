import { Context } from "koa";

export function setTokenCookie(ctx: Context, name: string, token: string) {
  ctx!.cookies.set(name, token, {
    httpOnly: true,
    maxAge: (1000 * 60 * 60 * 24 * 7)
  })
}

export function clearCookies(ctx: Context) {
  ctx!.cookies.set('access_token', null, {
    httpOnly: true,
    maxAge: 0
  })
  
  ctx!.cookies.set('refresh_token', null, {
    httpOnly: true,
    maxAge: 0
  })
}