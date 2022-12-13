import Router from "@koa/router";

const authRoute = new Router();

authRoute.post('/register', async ctx => {
  return 'register'
})

authRoute.post('/login', async ctx => {
  return 'login'
})

export default authRoute;