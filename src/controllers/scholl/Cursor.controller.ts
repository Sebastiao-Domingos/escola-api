import { Request, Response } from "express";
import { PaisService } from "../../services/localities/Pais.service";
import { PaisCreateData } from "../../Repositories/localiteis/Pais.repository";
import { BadRequestError, NotfoundError } from "../../helpers/api-error";
import { PrismaClient } from "@prisma/client";
import { validate } from "uuid";
import { CursoService } from "../../services/scholl/Curso.service";
import { CursoCreateData } from "../../Repositories/school/Curso.repository";

const service = new CursoService();
const prisma = new PrismaClient()

export class CursoController{
    /**
     * create
     */
    public async create( request : Request, response : Response) {
        const data : CursoCreateData = request.body;

        const curso= await prisma.curso.findUnique({
            where : {
                nome : data.nome
            }
        })

        if( curso ){
            response.status(400).json( new BadRequestError("Já existe curso com este nome"))
        }
        await service.add(data)
        .then( res => {
            return response.status(200).json(res)
        })
        .catch( error => {
            response.status(401).json( new NotfoundError(error))
        })
    }
        /**
     * create
     */
    public async update( request : Request, response : Response) {
        const curso_id : string = request.params.id;
        const data : Partial<CursoCreateData> = request.body;

        if(!validate(curso_id)){
            return response.status(400).json( new BadRequestError("id inválido!"))
        }

        const curso = await prisma.curso.findUnique( { where : {id : curso_id}}).then( res => res)

        if(!curso){
            return response.status(400).json( new BadRequestError("Curso não encontrado!"))
        }

        data.id = curso_id;
        return await service.update(data)
        .then( res => {
            return response.status(200).json(res)
        })
        .catch( error => {
            response.status(401).json( new NotfoundError(error))
        })
    }

    /**
     * get
     */
    public async get( request : Request , response : Response) {
        return await service.get()
        .then( res => {
            response.status(200).json(res)
        })
        .catch(error => {
            response.status(400).json( new NotfoundError( error))
        })
    }

    /**
     * find
     */
    public async find( request :Request , response : Response) {
        const curso_id : string = request.params.id;

        if(!validate(curso_id)){
            return response.status(404).json( new BadRequestError("id inválido !"))
        }

        return await service.find(curso_id)
        .then( resp => {
            return response.status(200).json(resp)
        })
        .catch( error => {
            return response.status(404).json(new NotfoundError(error))
        })
    }

    /**
     * delete
     */
    public async delete( request : Request , response :Response) {
        const curso_id :string = request.params.id;
        
        if(!validate(curso_id)){
            return response.status(400).json( new BadRequestError("id inválido !"))
        }

        const pais = await prisma.curso.findUnique( { where : {id : curso_id}}).then( res => res)

        if(!pais){
            return response.status(400).json( new BadRequestError("Curso não encontrado!"))
        }

        return await service.delete(curso_id)
        .then( () => {
            response.status(200).json({sms : "Eliminado com susseco"});
        })
        .catch( error => {
            response.status(400).json( new NotfoundError(error))
        })
    }
}