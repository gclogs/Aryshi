import Koa from 'koa';

const server = new Koa();

server.use(async ctx => {
  ctx.body = 'Hello world';
})

server.listen(4000, () => {
  console.log(`Listening to port 4000`)
})