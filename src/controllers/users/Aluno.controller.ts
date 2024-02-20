import { Request, Response } from "express";
import { EstudanteService } from "../../services/users/Estudante.service";
import { AlunoData, EstudanteDataCreate, SearchParamsData } from "../../Repositories/users/Estudante.repository";
import { validate } from "uuid";
import { BadRequestError } from "../../helpers/api-error";
import { PrismaClient } from "@prisma/client";
//import { validate } from "uuid";

const service = new EstudanteService();


const prisma = new PrismaClient();
export class AlunoController{

    /**
     * create
     */
    public async create( request : Request, response : Response) {
        const data : EstudanteDataCreate = request.body;

        if(!validate(data.turma_id) || !validate(data.naturalidade.municipio_id) || !validateEndereco(data.enderecos)){
            response.status(400).json( new BadRequestError("Id invalido!"))
        }

        const turma = await prisma.turma.findUnique({ where : {id : data.turma_id}}).then( res => res)

        if(!turma){
            response.status(400).json( new BadRequestError("A turma não existe!"))
        }

        const naturalidade = await prisma.municipio.findUnique({ where : {id : data.naturalidade.municipio_id}}).then( res =>res)

        if(!naturalidade){
            response.status(400).json( new BadRequestError("A Município da  natuaralidade não existe!"))
        }

        const endereco = validateEnderecoMunicipio(data.enderecos)

        if(!endereco){
            response.status(400).json( new BadRequestError("A Município do endereço não existe!"))
        }

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
        // const aluno_id : string = request.params.id;
        // const data : Partial<AlunoData> = request.body;
        // data.id = aluno_id;
        // return await service.update(data)
        // .then( res => {
        //     return response.status(200).json(res)
        // })
        // .catch( error => {
        //     response.status(401).json({sms : "erro!" , error : error})
        // })
    }

    /**
     * get
     */
    public async get( request : Request , response : Response) {
        const searchParams : Partial<SearchParamsData> = request.query;
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
        const aluno_id : string = request.params.id;

        return await service.find(aluno_id)
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
        const aluno_id :string = request.params.id;
        
        return await service.delete(aluno_id)
        .then( res => {
            response.status(200).json(res);
        })
        .catch( error => {
            response.status(400).json(error)
        })
    }
}

function validateEndereco( 
    endereco : { municipio_id: string,
                distrito: string,
                rua: string,
                ponto_de_referencia: string}[]
){
    return endereco.every( ender => validate(ender.municipio_id))
}


function validateEnderecoMunicipio( 
    endereco : { municipio_id: string,
                distrito: string,
                rua: string,
                ponto_de_referencia: string}[]
){
    return endereco.every( async (ender) => {
        const find = await prisma.municipio.findUnique( { where : { id : ender.municipio_id}}).then( res => res);

        return find !==null
    })
}