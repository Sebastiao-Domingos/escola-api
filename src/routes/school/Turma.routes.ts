
import Route from "express"
import  TurmaController  from "../../controllers/scholl/Turma.controller";


const turma_routes = Route();
const controller = new TurmaController();

const BASE_PATH = "/turmas"
turma_routes.post(BASE_PATH , controller.create)
turma_routes.get(BASE_PATH , controller.get)
turma_routes.get( `${BASE_PATH}/:id`, controller.find)
turma_routes.put( `${BASE_PATH}/:id`, controller.update)
turma_routes.delete( `${BASE_PATH}/:id`, controller.delete)

export {turma_routes}