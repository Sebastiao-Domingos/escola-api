import express from "express";
import { routes } from "./routes/index.routes";


const app = express();
const port = 3333

app.use(routes)

app.listen( port , ()=>{
    console.log(`Servidor rodando na porta ${port}`);
})
