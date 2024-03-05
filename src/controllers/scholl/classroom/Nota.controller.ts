import { Request, Response } from "express";
import { BadRequestError, NotfoundError } from "../../../helpers/api-error";
import { PrismaClient } from "@prisma/client";
import { validate } from "uuid";
import { NotaService } from "../../../services/scholl/classroom/Nota.service";
import { NotaCreateData } from "../../../Repositories/school/classroom/Nota.repository";

const service = new NotaService()
const prisma = new PrismaClient()

export default class NotaController{
    /**
     * create
     */
    public async create( request : Request, response : Response) {
        const data : NotaCreateData= request.body;
        data.valor = Number(data.valor)

        if(!validate(data.disciplina_id) || !validate(data.estudante_id)){
            response.status(400).json( new BadRequestError("Id inválido"))
        }

        const estudante= await prisma.estudante.findUnique({
            where : {
                 id : data.estudante_id
            }
        })

        if( !estudante ){
            response.status(400).json( new BadRequestError("Já existe estudante com este id"))
        }

        const disciplina= await prisma.disciplina.findUnique({
            where : {
                 id : data.disciplina_id,
                 turma_professor :{
                    some : {
                        turma : {
                            estudantes : {
                                some : {
                                    id : data.estudante_id
                                }
                            }
                        }
                    }
                 }
            }
        })

        if( !disciplina ){
            console.log("Estudante sem esta disciplina : ",data);

            response.status(400).json( new BadRequestError("Disciplina invalido"))
        }

        const notas = await prisma.nota.findMany({
            where : {
                disciplina_id : disciplina?.id,
                estudante_id : estudante?.id
            }
        }).then( res => res);

        if(notas.length){
            response.status(400).json( new BadRequestError(`O estudante ${estudante?.nome} já tem ${notas[0].valor} em ${disciplina?.nome}`))
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
        const data : Partial<NotaCreateData> = request.body;
        
        if(!validate(id)){
            return response.status(400).json( new BadRequestError("id inválido !"))
        }

        const nota = await prisma.nota.findUnique( { where : {id}}).then( res => res)

        if(!nota){
            return response.status(400).json( new BadRequestError("Nota não encontrado!"))
        }

        if( data.disciplina_id ){
            if(!validate(data.disciplina_id)){
                return response.status(400).json( new BadRequestError("id inválido !"))
            }
            const disciplina = await prisma.disciplina.findUnique({
                where : {
                    id : data.disciplina_id
                }
            }).then( res => res)
    
            if( !disciplina ){
                response.status(400).json( new BadRequestError("Disciplina não encontrado"))
            }
        }

        if( data.estudante_id ){
            if(!validate(data.estudante_id)){
                return response.status(400).json( new BadRequestError("id inválido !"))
            }
            const estudante= await prisma.estudante.findUnique({
                where : {
                    id : data.estudante_id
                }
            }).then( res => res)
    
            if( !estudante ){
                response.status(400).json( new BadRequestError("Estudante não encontrada"))
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

}