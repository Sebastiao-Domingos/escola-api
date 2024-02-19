import { Request, Response } from "express";
import { BadRequestError, NotfoundError } from "../../helpers/api-error";
import { PrismaClient } from "@prisma/client";
import { ProvinciaCreateData, SearchParamsDataProvincia } from "../../Repositories/localiteis/Provincia.repository";
import { MunicipioService } from "../../services/localities/Municipio.service";
import { MunicipioCreateData, SearchParamsDataMunicipio } from "../../Repositories/localiteis/Municipio.repository";
import { validate } from "uuid";

const service = new MunicipioService();
const prisma = new PrismaClient()

export class MunicipioController{
    /**
     * create
     */
    public async create( request : Request, response : Response) {
        const data : MunicipioCreateData = request.body;
        
        if(!validate(data.provincia_id)){
            return  response.status(400).json( new BadRequestError("id da província inválido"))
          }
  
          const provincia = await prisma.provincia.findUnique({where : {id : data.provincia_id}}).then( res => res)
  
          if( !provincia){
             return  response.status(400).json( new BadRequestError("Província não encontrada"))
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
        const municipio_id : string = request.params.id;
        const data : Partial<MunicipioCreateData> = request.body;

        if(!validate(municipio_id)){
          return  response.status(400).json( new BadRequestError("id do municipio inválido"))
        }

        const municipio = await prisma.municipio.findUnique({where : {id : municipio_id}}).then( res => res)

        if( !municipio){
           return  response.status(400).json( new BadRequestError("id do municipio inválido"))
        }

        data.id = municipio_id;
        await service.update(data)
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
        const searchParams : Partial<SearchParamsDataMunicipio> = request.query

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
        const municipio_id : string = request.params.id;

        if(!validate(municipio_id)){
            return  response.status(400).json( new BadRequestError("id do municipio inválido"))
        }

        return await service.find(municipio_id)
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
        const municipio_id :string = request.params.id;
        
        if(!validate(municipio_id)){
            return  response.status(400).json( new BadRequestError("id do municipio inválido"))
        }

        const municipio = await prisma.municipio.findUnique({where : {id : municipio_id}}).then( res => res)

        if( !municipio){
            return  response.status(400).json( new BadRequestError("id do municipio inválido"))
        }

        return await service.delete(municipio_id)
        .then( res => {
            response.status(200).json({sms : "Eliminado com susseco"});
        })
        .catch( error => {
            response.status(400).json( new NotfoundError(error))
        })
        
    }
}