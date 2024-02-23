import { Request, Response } from "express";
import { BadRequestError, NotfoundError } from "../../helpers/api-error";
import { PrismaClient } from "@prisma/client";
import { validate } from "uuid";
import { DepartamentoService } from "../../services/scholl/Departamento.service";
import { DepartamentoCreateData } from "../../Repositories/school/Departamento.repository";

const service = new DepartamentoService()
const prisma = new PrismaClient()

export default class DepartamentoController{
    /**
     * create
     */
    public async create( request : Request, response : Response) {
        const data : DepartamentoCreateData= request.body;

        const depa= await prisma.departamento.findUnique({
            where : {
                 codigo : data.codigo
            }
        })

        if( depa ){
            response.status(400).json( new BadRequestError("Já existe departamento com este código com"))
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
        const departamento_id : string = request.params.id;
        const data : Partial<DepartamentoCreateData> = request.body;
        
        if(!validate(departamento_id)){
            return response.status(400).json( new BadRequestError("id inválido !"))
        }

        const depa = await prisma.departamento.findUnique( { where : {id : departamento_id}}).then( res => res)

        if(!depa){
            return response.status(400).json( new BadRequestError("Turma não encontrado!"))
        }

        data.id = departamento_id;
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
        const departamento_id : string = request.params.id;

        if(!validate(departamento_id)){
            return response.status(404).json( new BadRequestError("id inválido !"))
        }

        return await service.find(departamento_id)
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
        const departamento_id :string = request.params.id;
        
        if(!validate(departamento_id)){
            return response.status(400).json( new BadRequestError("id inválido !"))
        }

        const pais = await prisma.departamento.findUnique( { where : {id : departamento_id}}).then( res => res)

        if(!pais){
            return response.status(400).json( new BadRequestError("Departamento não encontrado!"))
        }

        return await service.delete(departamento_id)
        .then( () => {
            response.status(200).json({sms : "Eliminado com susseco"});
        })
        .catch( error => {
            response.status(400).json( new NotfoundError(error))
        })
    }
}