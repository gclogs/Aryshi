import Router from '@koa/router';
import authMiddlewareAsync from './authMiddleware';

const middlewares: Router = new Router()

middlewares.get('/middlewares/user', authMiddlewareAsync)

export default middlewares;