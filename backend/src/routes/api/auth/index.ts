import Router from "@koa/router";
import userService from '../../../services/user.service'

const authRoute = new Router();

authRoute.post('/signup/local', async ctx => {
  const authResult = await userService.register(ctx.request.body);
  
  ctx.body = {
    status: 200,
    message: `${authResult.user.name} 회원이 가입하였습니다.`,
    data: authResult.token
  };

  return authResult;
})

authRoute.get('/', async ctx => {
  const { email } = ctx.query;
  const authResult = await userService.findEmail(email);
  return authResult;
})

authRoute.put('/', async ctx => {
  const user = await userService.update(ctx.request.body);

  ctx.body = {
    status: 200,
    message: `${user.name}님이 ${ctx.request.body}을(를) 수정하였습니다.`,
    data: user
  }

  return user;
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
  const user = await userService.login(ctx.request.body);
  
  if (user) {
    ctx.body = {
      status: 200,
      message: `${user.name} 님이 ${new Date().getFullYear()} 시간에 로그인 하였습니다.`,
    };
  }


  return user;
})

export default authRoute;