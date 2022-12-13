import Koa from 'koa';
import router from './routes'

const server: Koa = new Koa();

server.use(router.routes());
server.use(router.allowedMethods({
  throw: true
}));

server.listen(4000, () => {
  console.log(`Listening to port 4000`)
})