
import Route from "express"
import { AnoAcademicoController } from "../../controllers/scholl/AnoAcademico.controller";


const anoAcademico_routes = Route();
const controller = new AnoAcademicoController();

const BASE_PATH = "/ano_academico"
anoAcademico_routes.post(BASE_PATH , controller.create)
anoAcademico_routes.get(BASE_PATH , controller.get)
anoAcademico_routes.get( `${BASE_PATH}/:id`, controller.find)
anoAcademico_routes.put( `${BASE_PATH}/:id`, controller.update)
anoAcademico_routes.delete( `${BASE_PATH}/:id`, controller.delete)


export {anoAcademico_routes}