import { Request, Response } from "express";
import { validate } from "uuid";
import { BadRequestError } from "../../helpers/api-error";
import { PrismaClient } from "@prisma/client";
import { DisciplinaService } from "../../services/scholl/Disciplina.service";
import { DisciplinaCreateData, SearchParamsDataDisciplina } from "../../Repositories/school/Disciplina.repository";

const service = new DisciplinaService();

const prisma = new PrismaClient();

export class DisciplinaController{
    /**
     * create
     */
    public async create( request : Request, response : Response) {
        const data : DisciplinaCreateData = request.body;
        return await service.add(data)
        .then( res => {
            return response.status(200).json(res)
        })
        .catch( error => {
            response.status(401).json({sms : "erro!" , error : error.message})
        })

    }
        /**
     * create
     */
    public async update( request : Request, response : Response) {
        const id : string = request.params.id;
        const data : Partial<DisciplinaCreateData> = request.body;

        if(!validate(id)){
            response.status(400).json( new BadRequestError("Id invalido"))
        }

        const disciplina = await prisma.disciplina.findUnique( { where : {id}}).then(resp => resp)

        if(!disciplina){
            response.status(400).json( new BadRequestError("Disciplina não encontrado!"))
        }
        if(data.carga) {
            data.carga = Number(data.carga)
        }
        
        data.id = id;
        return await service.update(data)
        .then( res => {
            return response.status(200).json(res)
        })
        .catch( error => {
            response.status(401).json({sms : "erro!" , error : error.message})
        })
    }

    /**
     * get
     */
    public async get( request : Request , response : Response) {
        const searchParams : Partial<SearchParamsDataDisciplina> = request.query;
        
        return await service.get( searchParams )
        .then( res => {
            response.status(200).json(res)
        })
        .catch(error => {
            response.status(400).json({sms : "Erro" , error : error})
        })
    }

    /**
     * find
     */
    public async find( request :Request , response : Response) {
        const disciplina_id : string = request.params.id;

        if(!validate(disciplina_id)){
            response.status(400).json( new BadRequestError("Id invlido!"))
        }

        return await service.find(disciplina_id)
        .then( resp => {
            return response.status(200).json(resp)
        })
        .catch( error => {
            return response.status(400).json(error)
        })
    }

    public async getDisciplinasTurma( request :Request , response : Response) {
        const turma_id : string = request.params.id;

        if(!validate(turma_id)){
            response.status(400).json( new BadRequestError("Id invlido!"))
        }

        const turma = await prisma.turma.findUnique( {where: {id : turma_id}}).then( res => res);

        if(!turma){
            response.status(400).json( new BadRequestError("Não existe esta turma"))
        }

        return await service.getDisciplinasTurma(turma_id)
        .then( resp => {
            return response.status(200).json(resp)
        })
        .catch( error => {
            return response.status(400).json(error)
        })
    }


    /**
     * delete
     */
    public async delete( request : Request , response :Response) {
        const disciplina_id :string = request.params.id;
        
        return await service.delete(disciplina_id)
        .then( res => {
            response.status(200).json(res);
        })
        .catch( error => {
            response.status(400).json(error)
        })
    }
}
