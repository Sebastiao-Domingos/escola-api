import { Request, Response } from "express";
import { BadRequestError, NotfoundError } from "../../helpers/api-error";
import { PrismaClient } from "@prisma/client";
import { validate } from "uuid";
import { EscolherProfessorService } from "../../services/scholl/EscolherProfessor.service";
import { EscolherProfessorCreateData } from "../../Repositories/school/EscolherProfessor.repository";

const service = new EscolherProfessorService()
const prisma = new PrismaClient()

export default class EscolherProfessorController{
    /**
     * create
     */
    public async create( request : Request, response : Response) {
        const data : EscolherProfessorCreateData= request.body;

        if(!validate(data.turma_id) || !validate(data.professor_id) || !validate(data.disciplina_id)){
            response.status(400).json( new BadRequestError("Id inválido"))
        }

        const turma= await prisma.turma.findUnique({
            where : {
                 id : data.turma_id
            }
        })

        if( !turma ){
            response.status(400).json( new BadRequestError("Turma inválida!"))
        }

        const professor= await prisma.professor.findUnique({
            where : {
                 id : data.professor_id
            }
        })

        if( !professor ){
            response.status(400).json( new BadRequestError("Professor invalido"))
        }


        const disciplina= await prisma.disciplina.findUnique({
            where : {
                id : data.disciplina_id
            }
        })

        if( !disciplina ){
            response.status(400).json( new BadRequestError("Disciplina inválida"))
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
        const id : string = request.params.id;
        const data : Partial<EscolherProfessorCreateData> = request.body;
        
        if(!validate(id)){
            return response.status(400).json( new BadRequestError("id inválido !"))
        }

        const esc_prof = await prisma.turma.findUnique( { where : {id}}).then( res => res)

        if(!esc_prof){
            return response.status(400).json( new BadRequestError("Turma não encontrado!"))
        }

        if(!validate(data.turma_id!) || !validate(data.professor_id!) || !validate(data.disciplina_id!)){
            response.status(400).json( new BadRequestError("Id inválido"))
        }

        if( data.turma_id){
            const turma= await prisma.turma.findUnique({
                where : {
                     id : data.turma_id
                }
            })
    
            if( !turma ){
                response.status(400).json( new BadRequestError("Turma inválida!"))
            }
        }

        if(data.professor_id){
            const professor= await prisma.professor.findUnique({
                where : {
                     id : data.professor_id
                }
            })
    
            if( !professor ){
                response.status(400).json( new BadRequestError("Professor invalido"))
            }
        }

        if(data.disciplina_id){
            const disciplina= await prisma.disciplina.findUnique({
                where : {
                    id : data.disciplina_id
                }
            })
    
            if( !disciplina ){
                response.status(400).json( new BadRequestError("Disciplina inválida"))
            }
        }

        data.id = id;
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
        const id : string = request.params.id;

        if(!validate(id)){
            return response.status(404).json( new BadRequestError("id inválido !"))
        }

        return await service.find(id)
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
        const id :string = request.params.id;
        
        if(!validate(id)){
            return response.status(400).json( new BadRequestError("id inválido !"))
        }

        const esc_prof = await prisma.turmaProfessor.findUnique( { where : {id : id}}).then( res => res)

        if(!esc_prof){
            return response.status(400).json( new BadRequestError("Turma não encontrado!"))
        }

        return await service.delete(id)
        .then( () => {
            response.status(200).json({sms : "Eliminado com susseco"});
        })
        .catch( error => {
            response.status(400).json( new NotfoundError(error))
        })
    }
}