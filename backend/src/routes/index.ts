import Router from '@koa/router';
import api from './api/index'

const routes: Router = new Router()

routes.use('/api', api.routes());

routes.get('/', ctx => {
  ctx.body = {
    message: 'Hello world'
  };
})

export default routes;