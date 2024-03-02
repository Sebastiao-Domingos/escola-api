import { Request, Response } from "express";
import { SessionService } from "../../services/session/Session.service";
import { LogInData } from "../../Repositories/session/Session.repository";
import { PrismaClient } from "@prisma/client";
import { BadRequestError } from "../../helpers/api-error";
import bcrypt from "bcrypt"


const service = new SessionService();
const prisma = new  PrismaClient();

export class SessionController {

    async login ( request : Request , response : Response) {
        const {email,senha} : LogInData = request.body;
        
        const getUser = await prisma.administrador.findMany({
            where : {
                contatos : {
                    some : {
                        valor : email
                    }
                }
            },
            include : {
                contatos : true
            }
        })


        if(!getUser.length){
            response.status(400).json( new BadRequestError("E-mail ou senha inválida"))
        }

        const verifyPassWord = await bcrypt.compare( senha!, getUser[0].senha).then( res => res);

        if( !verifyPassWord ){
            response.status(400).json( new BadRequestError("E-mail ou senha inválida"))
        }


        const respon  = service.logIn({id : getUser[0].id , nome : getUser[0].nome , email : getUser[0].contatos[0].valor})

        console.log(respon);
        
        response.status(200).json(respon);
    }
}