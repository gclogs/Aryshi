import Koa, { Context } from 'koa';
import router from './routes'
import bodyParser from 'koa-bodyparser';
import mongoDB from './database';
import * as dotenv from 'dotenv';
import middlewares from './middleware';
dotenv.config();

const database = new mongoDB();
const server: Koa = new Koa();
database.conn();

server.use(bodyParser())
server.use(middlewares.routes());
server.use(router.routes());
server.use(router.allowedMethods({
  throw: true
}));

server.listen(4000, () => {
  console.log(`Connected localhost port 4000`)
})