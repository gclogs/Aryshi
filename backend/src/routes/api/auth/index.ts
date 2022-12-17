import Router from "@koa/router";
import User from "../../../schema/user";
import { passwordEncryption, userRegiseter } from '../../../services/user.service';

const authRoute = new Router();

authRoute.post('/register/local', async ctx => {
  const { user_id, name, email, nickname, password, service_number  } = ctx.request.body;
  
  const EncryptedPwd = passwordEncryption(password)
  const user = userRegiseter(user_id, name, email, nickname, service_number, EncryptedPwd[0], EncryptedPwd[1]);
  ctx.status = 200;

  console.log(user);
})

/** user manage */
authRoute.get('/user', async ctx => {
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

authRoute.delete('user/:id', async ctx => {
  const id = ctx.params;

  try {
    await User.findByIdAndRemove(id).exec();
    ctx.status = 200;
  } catch (e) {
    console.log(e);
  }
})

export default authRoute;