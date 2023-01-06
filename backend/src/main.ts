import Koa, { Context } from 'koa';
import router from './routes'
import bodyParser from 'koa-bodyparser';
import mongoDB from './database';
import * as dotenv from 'dotenv';
import { authMiddlewareAsync } from './middleware/authMiddleware';

dotenv.config();

const database = new mongoDB();
const server: Koa = new Koa();
database.conn();

server.use(authMiddlewareAsync)
server.use(bodyParser())
server.use(router.routes());
server.use(router.allowedMethods({
  throw: true
}));

server.listen(4000, () => {
  console.log(`Connected localhost port 4000`)
})