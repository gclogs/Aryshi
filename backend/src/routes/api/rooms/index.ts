
import Router from "@koa/router";
import Rooms from "../../../schema/rooms";

const roomsRoute = new Router();

roomsRoute.post('/rooms', async ctx => {
  const { code, admin, title, description, key, is_hidden, created_at} = ctx.request.body;

  try {

  }
})