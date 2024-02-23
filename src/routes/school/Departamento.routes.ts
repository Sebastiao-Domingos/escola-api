
import Route from "express"
import DepartamentoController from "../../controllers/scholl/Departamento.controller";


const departamento_routes = Route();
const controller = new DepartamentoController();

const BASE_PATH = "/departamentos"
departamento_routes.post(BASE_PATH , controller.create)
departamento_routes.get(BASE_PATH , controller.get)
departamento_routes.get( `${BASE_PATH}/:id`, controller.find)
departamento_routes.put( `${BASE_PATH}/:id`, controller.update)
departamento_routes.delete( `${BASE_PATH}/:id`, controller.delete)

export {departamento_routes}