
import Route from "express"
import  TurmaController  from "../../controllers/scholl/Turma.controller";
import { DisciplinaController } from "../../controllers/scholl/Disciplina.controller";


const disciplinas_routes = Route();
const controller = new DisciplinaController();

const BASE_PATH = "/disciplinas"
disciplinas_routes.post(BASE_PATH , controller.create)
disciplinas_routes.get(BASE_PATH , controller.get)
disciplinas_routes.get( `${BASE_PATH}/turma/:id`, controller.getDisciplinasTurma)
disciplinas_routes.get( `${BASE_PATH}/:id`, controller.find)
disciplinas_routes.put( `${BASE_PATH}/:id`, controller.update)
disciplinas_routes.delete( `${BASE_PATH}/:id`, controller.delete)

export {disciplinas_routes}