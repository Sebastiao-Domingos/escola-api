
import Route from "express"
import { PaisController } from "../../controllers/localities/Pais.controller";


const pais_routes = Route();
const controller = new PaisController();

const BASE_PATH = "/paises"
pais_routes.post(BASE_PATH , controller.create)
pais_routes.get(BASE_PATH , controller.get)
pais_routes.get( `${BASE_PATH}/:id`, controller.find)
pais_routes.put( `${BASE_PATH}/:id`, controller.update)
pais_routes.delete( `${BASE_PATH}/:id`, controller.delete)


export {pais_routes}