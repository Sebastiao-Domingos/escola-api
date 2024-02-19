import express from "express"
import swaggerDocs from "../../swagger.json";
import SwaggerUi from "swagger-ui-express";
import { estudantes_routes} from "./users/Estudantes.routes";
import { pais_routes } from "./localities/Pais.routes";
import { provincia_routes } from "./localities/Provincia.routes";
import { municipios_routes } from "./localities/Municipio.routes";
import { anoAcademico_routes } from "./school/AnoAcademico.routes";

const routes = express();



routes.use( express.json());
routes.use("/api-docs", SwaggerUi.serve , SwaggerUi.setup(swaggerDocs , { explorer : true}))

routes.use(estudantes_routes)
routes.use(pais_routes)
routes.use(provincia_routes)
routes.use(municipios_routes)
routes.use(anoAcademico_routes)
export {routes};

