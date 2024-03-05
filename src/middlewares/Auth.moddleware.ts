import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../helpers/api-error";
import jwt from "jsonwebtoken";
import { PASS_SECRET } from "../services/session/Session.service";
import { PayLoadType } from "../Repositories/session/Session.repository";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export async function authMiddleware ( request : Request , response : Response, next : NextFunction ){
    const {authorization} = request.headers;

    if(!authorization ){
        response.status(401).json( new UnauthorizedError("Não autorizado!"))
    }

    const token = authorization?.split(" ")[1];

    try {
        const {id}  = jwt.verify( token! , PASS_SECRET) as PayLoadType;


        const admin = await prisma.administrador.findUnique({
            where : {id},
            include : {
                contatos : true
            }
        })

        if(!admin ){
            response.status(401).json( new UnauthorizedError("Não autorizado!"))
        }

        const user = {
            id : admin?.id,
            nome : admin?.nome,
            email : admin?.contatos[0].valor,
            tipo : admin?.tipo
        }

        request.user = user;

        next();
    } catch (error) {
        response.status(401).json( new UnauthorizedError("Não autorizado!"))
    }
}