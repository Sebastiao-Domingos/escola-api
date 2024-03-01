
import Route from "express"
import NotaController from "../../../controllers/scholl/classroom/Nota.controller";



const notas_routes = Route();
const controller = new NotaController();

const BASE_PATH = "/notas"
notas_routes.post(BASE_PATH , controller.create)
notas_routes.get(BASE_PATH , controller.get)
notas_routes.put( `${BASE_PATH}/:id`, controller.update)

export {notas_routes }