import Router from "@koa/router";
import authCtrl from "./auth.ctrl";
import authMiddlewareAsync from '../../../middleware/authMiddleware'
import db from "../../../lib/db";

const authRoute = new Router();

authRoute.get('/check', authMiddlewareAsync)

authRoute.post('/signup/local', authCtrl.register);
authRoute.post('/login', authCtrl.loign);
authRoute.delete('/', authCtrl.remove);
authRoute.post('/refresh', authCtrl.refresh);
authRoute.post('/logout', authCtrl.logout);

export default authRoute;