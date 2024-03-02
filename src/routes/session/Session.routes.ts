import { Router } from "express";
import { SessionController } from "../../controllers/session/Session.controller";

const controller = new SessionController();
const session_routes = Router();

session_routes.post('/sessao',controller.login);

export {session_routes};
