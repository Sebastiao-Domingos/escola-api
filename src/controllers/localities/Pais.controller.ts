import { Request, Response } from "express";
import { PaisService } from "../../services/localities/Pais.service";
import { PaisCreateData } from "../../Repositories/localiteis/Pais.repository";
import { BadRequestError, NotfoundError } from "../../helpers/api-error";
import { PrismaClient } from "@prisma/client";
import { validate } from "uuid";

const service = new PaisService();
const prisma = new PrismaClient()

export class PaisController{
    /**
     * create
     */
    public async create( request : Request, response : Response) {
        const data : PaisCreateData = request.body;

        const pais= await prisma.pais.findUnique({
            where : {
                nome : data.nome
            }
        })

        if( pais ){
            response.status(400).json( new BadRequestError("Já existe país com este nome"))
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
        const pais_id : string = request.params.id;
        const data : Partial<PaisCreateData> = request.body;

        if(!validate(pais_id)){
            return response.status(400).json( new BadRequestError("id inválido !"))
        }

        const pais = await prisma.pais.findUnique( { where : {id : pais_id}}).then( res => res)

        if(!pais){
            return response.status(400).json( new BadRequestError("País não encontrado!"))
        }

        data.id = pais_id;
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
        const pais_id : string = request.params.id;

        if(!validate(pais_id)){
            return response.status(404).json( new BadRequestError("id inválido !"))
        }

        return await service.find(pais_id)
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
        const pais_id :string = request.params.id;
        
        if(!validate(pais_id)){
            return response.status(400).json( new BadRequestError("id inválido !"))
        }

        const pais = await prisma.pais.findUnique( { where : {id : pais_id}}).then( res => res)

        if(!pais){
            return response.status(400).json( new BadRequestError("País não encontrado!"))
        }

        return await service.delete(pais_id)
        .then( () => {
            response.status(200).json({sms : "Eliminado com susseco"});
        })
        .catch( error => {
            response.status(400).json( new NotfoundError(error))
        })
    }
}