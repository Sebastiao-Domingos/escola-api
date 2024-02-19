import { Request, Response } from "express";
import { BadRequestError, NotfoundError } from "../../helpers/api-error";
import { PrismaClient } from "@prisma/client";
import { validate } from "uuid";
import { AnoAcademicoService } from "../../services/scholl/Ano_academico.service";
import { AnoCreateData } from "../../Repositories/school/Ano_academico.repositories";

const service = new AnoAcademicoService();
const prisma = new PrismaClient()

export class AnoAcademicoController{
    /**
     * create
     */
    public async create( request : Request, response : Response) {
        const data : AnoCreateData = request.body;

        const pais= await prisma.ano_academico.findUnique({
            where : {
                valor : data.valor
            }
        })

        if( pais ){
            response.status(400).json( new BadRequestError("Já existe ano académico com este valor"))
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
        const ano_id : string = request.params.id;
        const data : Partial<AnoCreateData> = request.body;

        if(!validate(ano_id)){
            return response.status(400).json( new BadRequestError("id inválido !"))
        }

        const ano = await prisma.ano_academico.findUnique( { where : {id : ano_id}}).then( res => res)

        if(!ano){
            return response.status(400).json( new BadRequestError("Ano académico não encontrado!"))
        }

        data.id = ano_id;
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
        const ano_id : string = request.params.id;

        if(!validate(ano_id)){
            return response.status(404).json( new BadRequestError("id inválido !"))
        }

        return await service.find(ano_id)
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
        const ano_id :string = request.params.id;
        
        if(!validate(ano_id)){
            return response.status(400).json( new BadRequestError("id inválido !"))
        }

        const pais = await prisma.ano_academico.findUnique( { where : {id : ano_id}}).then( res => res)

        if(!pais){
            return response.status(400).json( new BadRequestError("Ano académico não encontrado!"))
        }

        return await service.delete(ano_id)
        .then( () => {
            response.status(200).json({sms : "Eliminado com susseco"});
        })
        .catch( error => {
            response.status(400).json( new NotfoundError(error))
        })
    }
}