
import express from "express"
import { EstudanteController } from "../../controllers/users/Estudante.controller";
import { upload } from "../../middlewares/multer.middleware";
import { ProfessorController } from "../../controllers/users/Professor.controllers";

const professores_routes = express();

const controller = new ProfessorController()
const BASE_PATH = "/professores"
professores_routes.post(BASE_PATH ,upload.single("foto"), controller.create)
professores_routes.put(`${BASE_PATH}/:id` , controller.update)
professores_routes.get(BASE_PATH ,controller.get )
professores_routes.get(`${BASE_PATH}/:id` ,controller.find)
professores_routes.get(`${BASE_PATH}/turma/:id` ,controller.getProfessoresTurma)
professores_routes.delete(`${BASE_PATH}/:id` ,controller.delete )

export {professores_routes}