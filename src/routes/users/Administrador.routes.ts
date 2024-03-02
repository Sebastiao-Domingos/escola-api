
import express from "express"
import { upload } from "../../middlewares/multer.middleware";
import { AdministradorController } from "../../controllers/users/Administrador.controller";

const administradores_routes = express();

const controller = new AdministradorController()
const BASE_PATH = "/administradores"
administradores_routes.post(BASE_PATH ,upload.single("foto"), controller.create)
administradores_routes.put(`${BASE_PATH}/:id` , controller.update)
administradores_routes.get(BASE_PATH ,controller.get )
administradores_routes.get(`${BASE_PATH}/:id` ,controller.find)
administradores_routes.delete(`${BASE_PATH}/:id` ,controller.delete )

export {administradores_routes}