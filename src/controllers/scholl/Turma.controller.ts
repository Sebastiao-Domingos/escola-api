import { Request, Response } from "express";
import { BadRequestError, NotfoundError } from "../../helpers/api-error";
import { PrismaClient } from "@prisma/client";
import { validate } from "uuid";
import { TurmaService } from "../../services/scholl/Turma.service";
import { TurmaCreateData } from "../../Repositories/school/Turma.repositories";

const service = new TurmaService()
const prisma = new PrismaClient()

export default class TurmaController{
    /**
     * create
     */
    public async create( request : Request, response : Response) {
        const data : TurmaCreateData= request.body;

        const turma= await prisma.turma.findUnique({
            where : {
                 nome : data.nome
            }
        })

        if( turma ){
            response.status(400).json( new BadRequestError("Já existe turma com este nome"))
        }

        if(!validate(data.ano_academico_id)){
            response.status(400).json( new BadRequestError("Id do ano académico inválido"))
        }

        const ano_academico= await prisma.ano_academico.findUnique({
            where : {
                id : data.ano_academico_id
            }
        })

        if( !ano_academico ){
            response.status(400).json( new BadRequestError("Ano académico não encontrado"))
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
     * update
     */
    public async update( request : Request, response : Response) {
        const turma_id : string = request.params.id;
        const data : Partial<TurmaCreateData> = request.body;
        
        if(!validate(turma_id)){
            return response.status(400).json( new BadRequestError("id inválido !"))
        }

        const turma = await prisma.turma.findUnique( { where : {id : turma_id}}).then( res => res)

        if(!turma){
            return response.status(400).json( new BadRequestError("Turma não encontrado!"))
        }

        if( data.ano_academico_id ){
            if(!validate(data.ano_academico_id)){
                return response.status(400).json( new BadRequestError("id inválido !"))
            }

            const ano_academico= await prisma.ano_academico.findUnique({
                where : {
                    id : data.ano_academico_id
                }
            })
    
            if( !ano_academico ){
                response.status(400).json( new BadRequestError("Ano académico não encontrado"))
            }

            data.id = turma_id;
            return await service.update(data)
            .then( res => {
                return response.status(200).json(res)
            })
            .catch( error => {
                response.status(401).json( new NotfoundError(error))
            })
        }

        data.id = turma_id;
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
        const turma_id : string = request.params.id;

        if(!validate(turma_id)){
            return response.status(404).json( new BadRequestError("id inválido !"))
        }

        return await service.find(turma_id)
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
        const turma_id :string = request.params.id;
        
        if(!validate(turma_id)){
            return response.status(400).json( new BadRequestError("id inválido !"))
        }

        const pais = await prisma.turma.findUnique( { where : {id : turma_id}}).then( res => res)

        if(!pais){
            return response.status(400).json( new BadRequestError("Turma não encontrado!"))
        }

        return await service.delete(turma_id)
        .then( () => {
            response.status(200).json({sms : "Eliminado com susseco"});
        })
        .catch( error => {
            response.status(400).json( new NotfoundError(error))
        })
    }
}