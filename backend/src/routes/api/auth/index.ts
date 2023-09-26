import Router from "@koa/router";
import authCtrl from "./auth.ctrl";

const authRoute = new Router();

authRoute.post('/register', authCtrl.register);
authRoute.post('/login', authCtrl.login);
authRoute.delete('/', authCtrl.remove);
authRoute.post('/refresh', authCtrl.refresh);
authRoute.post('/logout', authCtrl.logout);

export default authRoute;