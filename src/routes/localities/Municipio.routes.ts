
import Route from "express"
import { MunicipioController } from "../../controllers/localities/Municipio.controller";


const municipios_routes = Route();
const controller = new MunicipioController();

const BASE_PATH = "/municipios"
municipios_routes.post(BASE_PATH , controller.create)
municipios_routes.get(BASE_PATH , controller.get)
municipios_routes.get( `${BASE_PATH}/:id`, controller.find)
municipios_routes.put( `${BASE_PATH}/:id`, controller.update)
municipios_routes.delete( `${BASE_PATH}/:id`, controller.delete)


export {municipios_routes}