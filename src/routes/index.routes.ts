import express from "express"
import swaggerDocs from "../../swagger.json";
import SwaggerUi from "swagger-ui-express";
import { estudantes_routes} from "./users/Estudantes.routes";
import { pais_routes } from "./localities/Pais.routes";
import { provincia_routes } from "./localities/Provincia.routes";
import { municipios_routes } from "./localities/Municipio.routes";
import { anoAcademico_routes } from "./school/AnoAcademico.routes";
import { turma_routes } from "./school/Turma.routes";
import { curso_routes } from "./school/Curso.routes";
import { departamento_routes } from "./school/Departamento.routes";
import { upload } from "../middlewares/multer.middleware";
import { professores_routes } from "./users/Professor.routes";
import { disciplinas_routes } from "./school/Disciplinas.routes";
import { escolher_professor_routes } from "./school/EscolherProfessor.routes";
import { notas_routes } from "./school/classroom/Nota.routes";
import { administradores_routes } from "./users/Administrador.routes";
import { session_routes } from "./session/Session.routes";

const routes = express();

routes.use( express.json());
routes.use("/files" , express.static("public/uploads"))
routes.use("/api-docs", SwaggerUi.serve , SwaggerUi.setup(swaggerDocs))
routes.use(estudantes_routes)
routes.use(pais_routes)
routes.use(provincia_routes)
routes.use(municipios_routes)
routes.use(anoAcademico_routes)
routes.use(turma_routes)
routes.use(curso_routes)
routes.use(departamento_routes)
routes.use(professores_routes)
routes.use(disciplinas_routes)
routes.use(escolher_professor_routes)
routes.use(notas_routes)
routes.use(administradores_routes)
routes.use(session_routes)

routes.post("/upload" , upload.single("file") , (req, res) =>{
    return res.json(req.file?.originalname)
})
export {routes};

