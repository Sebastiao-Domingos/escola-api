
import Route from "express"
import { CursoController } from "../../controllers/scholl/Cursor.controller";

const curso_routes = Route();
const controller = new CursoController();

const BASE_PATH = "/cursos"
curso_routes.post(BASE_PATH , controller.create)
curso_routes.get(BASE_PATH , controller.get)
curso_routes.get( `${BASE_PATH}/:id`, controller.find)
curso_routes.put( `${BASE_PATH}/:id`, controller.update)
curso_routes.delete( `${BASE_PATH}/:id`, controller.delete)

export {curso_routes}