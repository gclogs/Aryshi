import Router from "@koa/router";
import authCtrl from "./auth.ctrl";

const authRoute = new Router();

authRoute.post('/signup/local', authCtrl.register);
authRoute.post('/login', authCtrl.loign);
authRoute.delete('/', authCtrl.remove);
authRoute.post('/refresh', authCtrl.refresh);
authRoute.post('/logout', authCtrl.logout);

export default authRoute;