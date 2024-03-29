
import express from "express"
import { AlunoController } from "../../controllers/users/Estudante.controller";
import { upload } from "../../middlewares/multer.middleware";

const estudantes_routes = express();

const controller = new AlunoController()
const BASE_PATH = "/estudantes"
estudantes_routes.post(BASE_PATH ,upload.single("foto"), controller.create)
estudantes_routes.put(`${BASE_PATH}/:id` , controller.update)
estudantes_routes.get(BASE_PATH ,controller.get )
estudantes_routes.get(`${BASE_PATH}/:id` ,controller.find)
estudantes_routes.delete(`${BASE_PATH}/:id` ,controller.delete )

export {estudantes_routes}