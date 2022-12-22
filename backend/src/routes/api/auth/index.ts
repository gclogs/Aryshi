import Router from "@koa/router";
import User from "../../../schema/user";
import userService from '../../../services/user.service'

const authRoute = new Router();

authRoute.post('/signup/local', async ctx => {
  const user = await userService.register(ctx.request.body);
  if (user) {
    ctx.status = 200;
    return user;
  }
})

/** user manage */
authRoute.get('/', async ctx => {
  const { id } = ctx.query;

  try {
    const user = await User.findById(id).exec();

    if (!user) {
      ctx.status = 404;
      ctx.body = {
        message: 'user not found'
      }
      return;
    }

    ctx.body = user;
  } catch (e) {
    console.log(e);
  }
})

authRoute.delete('/:email', async ctx => {
  const email  = ctx.params;
  const authResult = await userService.unregister(email);
  console.log(email);
  ctx.status = 200;
  return authResult;
})

export default authRoute;