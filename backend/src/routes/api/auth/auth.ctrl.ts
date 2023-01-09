import { Context } from "koa";
import { clearCookies, setTokenCookie } from "../../../lib/cookies";
import userService from "../../../services/user.service"

const authCtrl = {
  async loign(ctx: Context) {
    const authResult = await userService.login(ctx.request.body);

    setTokenCookie(ctx, 'access_token', authResult.tokens.accessToken);
    setTokenCookie(ctx, 'refresh_token', authResult.tokens.refreshToken);


    ctx.body = {
      data: authResult
    }

    return authResult;
  },

  async logout(ctx: Context) {
    ctx.request.user = null;
    clearCookies(ctx);
  },

  async register(ctx: Context) {
    const authResult = await userService.register(ctx.request.body);
    return authResult;
  },

  async remove(ctx: Context) {
    const authResult = await userService.unregister(ctx.request.body);
    return authResult;
  },

  async refresh(ctx: Context) {
    const refreshToken = ctx.request.requestToken ?? ctx.cookies.get('refresh_token');
    if (!refreshToken) {
      throw new Error('BadRequest');
    }

    const tokens = await userService.refreshToken(refreshToken);
    setTokenCookie(ctx, 'access_token', tokens);

    return tokens;
  }
}

export default authCtrl;