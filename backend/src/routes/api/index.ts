import Router from "@koa/router";
import auth from './auth/index';

const api: Router = new Router();

api.use('/auth', auth.routes())

api.get('/', async ctx => {
  ctx.body = 'Hello api'
})

export default api;