
import express from "express"
import { AlunoController } from "../../controllers/users/Aluno.controller";

const estudantes_routes = express();

const controller = new AlunoController()

estudantes_routes.post("/alunos" , controller.create)
estudantes_routes.put("/alunos/:id" , controller.update)
estudantes_routes.get("/alunos" ,controller.get )
estudantes_routes.get("/alunos/:id" ,controller.find)
estudantes_routes.delete("/alunos/:id" ,controller.delete )

export {estudantes_routes}