import { Request, Response } from "express";
import { BadRequestError, NotfoundError } from "../../helpers/api-error";
import { PrismaClient } from "@prisma/client";
import { ProvinciaService } from "../../services/localities/Provincia.service";
import { ProvinciaCreateData, SearchParamsDataProvincia } from "../../Repositories/localiteis/Provincia.repository";
import { validate } from "uuid";

const service = new ProvinciaService();
const prisma = new PrismaClient()

export class ProvinciaController{
    /**
     * create
     */
    public async create( request : Request, response : Response) {
        const data : ProvinciaCreateData = request.body;

        if(!validate(data.pais_id)){
            response.status(400).json( new BadRequestError("Id da provincia inválido"))
        }

        const pais = await prisma.pais.findUnique({ where : {id : data.pais_id}})
        .then( res => res)

        if(!pais){
            response.status(400).json( new BadRequestError("País não encontrada"))
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
        const provincia_id : string = request.params.id;
        const data : Partial<ProvinciaCreateData> = request.body;

        if(!validate(provincia_id)){
            response.status(400).json( new BadRequestError("Id da provincia inválido"))
        }

        const provincia = await prisma.provincia.findUnique({ where : {id : provincia_id}})
        .then( res => res)

        if(!provincia){
            response.status(400).json( new BadRequestError("Província não encontrada"))
        }

        data.id = provincia_id;
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
        const searchParams : Partial<SearchParamsDataProvincia> = request.query

        return await service.get(searchParams)
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
        const provincia_id : string = request.params.id;

        if(!validate(provincia_id)){
            response.status(400).json( new BadRequestError("Id da provincia inválido"))
        }

        return await service.find(provincia_id)
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
        const provincia_id :string = request.params.id;
        if(!validate(provincia_id)){
            response.status(400).json( new BadRequestError("Id da provincia inválido"))
        }

        const provincia = await prisma.provincia.findUnique({ where : {id : provincia_id}})
        .then( res => res)

        if(!provincia){
            response.status(400).json( new BadRequestError("Província não encontrada"))
        }
    
        return await service.delete(provincia_id)
        .then( res => {
            response.status(200).json({sms : "Eliminado com susseco"});
        })
        .catch( error => {
            response.status(400).json( new NotfoundError(error))
        })
        
    }
}