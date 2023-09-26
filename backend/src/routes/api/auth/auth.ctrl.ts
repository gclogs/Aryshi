import { Context } from "koa";
import { clearCookies, setTokenCookie } from "../../../lib/cookies";
import AppError from "../../../lib/error";
import userService from "../../../services/user.service"

const authCtrl = {
  async login(ctx: Context) {
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
    const refreshToken = ctx.request.refershToekn ?? ctx.cookies.get('refresh_token');
    if (!refreshToken) {
      throw new AppError('BadRequest');
    }

    const tokens = await userService.refreshToken(refreshToken);
    if (!tokens) {
      throw new AppError('BadRequest')
    }
    setTokenCookie(ctx, 'access_token', tokens);

    return tokens;
  },

  async getMyAccount(ctx: Context) {
    const authResult = ctx.request.body;
    console.log(authResult)
    return authResult;
  }
}

export default authCtrl;