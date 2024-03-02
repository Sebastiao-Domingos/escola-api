import { Administrador } from "@prisma/client";
import { LogInData, LogInResponse, SessionRepository } from "../../Repositories/session/Session.repository";
import jwt from "jsonwebtoken"
export const PASS_SECRET ="sebas1234escola"

export class SessionService implements SessionRepository{

    public  logIn(data: LogInData ) : LogInResponse {
        
        const token  = jwt.sign({
                id : data.id,
                nome : data.nome
            },
            PASS_SECRET,
            {
                expiresIn : 60*60
            }
        ) 
        return {
            id: data.id!,
            nome: data.nome!,
            email : data.email!,
            token: token 
        }
    }
}