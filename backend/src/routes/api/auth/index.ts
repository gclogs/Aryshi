import Router from "@koa/router";
import userService from '../../../services/user.service'

const authRoute = new Router();

authRoute.post('/signup/local', async ctx => {
  const authResult = await userService.register(ctx.request.body);
  
  ctx.body = {
    status: 200,
    message: `${authResult.user.name} 회원이 가입하였습니다.`,
    data: authResult.tokens
  };

  return authResult;
})

authRoute.delete('/', async ctx => {
  const { email }: any = ctx.query;
  const user = await userService.unregister(email);

  ctx.body = {
    status: 200,
    message: `${user.name}(${user.email}) 님이 회원탈퇴 하였습니다.`
  }

  return user;
})

authRoute.post('/login', async ctx => {
  const authResult = await userService.login(ctx.request.body);

  ctx.cookies.set('access_token', authResult.tokens.accessToken, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7
  });

  ctx.cookies.set('refresh_token', authResult.tokens.refreshToken, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7
  });

  console.log(ctx.cookies.get('refresh_token'))

  if (authResult.user) {
    ctx.body = authResult.user
  }

  return authResult;
})

export default authRoute;