
import Route from "express"
import  TurmaController  from "../../controllers/scholl/Turma.controller";
import { EscolherProfessorService } from "../../services/scholl/EscolherProfessor.service";
import EscolherProfessorController from "../../controllers/scholl/EscolherProfessor.controller";


const escolher_professor_routes = Route();
const controller = new  EscolherProfessorController();

const BASE_PATH = "/selecionar_professor"
escolher_professor_routes.post(BASE_PATH , controller.create)
escolher_professor_routes.get(BASE_PATH , controller.get)
escolher_professor_routes.get( `${BASE_PATH}/:id`, controller.find)
escolher_professor_routes.put( `${BASE_PATH}/:id`, controller.update)
escolher_professor_routes.delete( `${BASE_PATH}/:id`, controller.delete)

export {escolher_professor_routes }