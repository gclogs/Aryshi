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

authRoute.get('/', async ctx => {
  const { email } = ctx.query;
  const authResult = await userService.getEmail(email);
  return authResult;
})

authRoute.put('/', async ctx => {
  const authResult = await userService.update(ctx.request.body);

  ctx.body = {
    status: 200
  }
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
  
  if (authResult.user) {
    ctx.body = {
      status: 200,
      message: `${authResult.user.name} 님이 ${new Date()} 시간에 로그인 하였습니다.`,
      data: authResult
    };
  }

  return authResult;
})

export default authRoute;