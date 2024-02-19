
import Route from "express"
import { ProvinciaController } from "../../controllers/localities/Provincia.controller";


const provincia_routes = Route();
const controller = new ProvinciaController();

const BASE_PATH = "/provincias"
provincia_routes.post(BASE_PATH , controller.create)
provincia_routes.get(BASE_PATH , controller.get)
provincia_routes.get( `${BASE_PATH}/:id`, controller.find)
provincia_routes.put( `${BASE_PATH}/:id`, controller.update)
provincia_routes.delete( `${BASE_PATH}/:id`, controller.delete)


export {provincia_routes}