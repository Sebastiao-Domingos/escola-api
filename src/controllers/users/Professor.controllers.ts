import { Request, Response } from "express";
import { ContatoDate, ContatoType, EnderecoDate, EnderecoType, NaturalidadeType} from "../../Repositories/users/Estudante.repository";
import { validate } from "uuid";
import { BadRequestError } from "../../helpers/api-error";
import { PrismaClient } from "@prisma/client";
import { ProfessorService } from "../../services/users/Professor.service";
import { ProfessorDataCreate, ProfessorDataCreateReceived, ProfessorDataUpdate, SearchParamsData } from "../../Repositories/users/Professor.Repository";

const service = new ProfessorService();

const prisma = new PrismaClient();
export class ProfessorController{
    /**
     * create
     */
    public async create( request : Request, response : Response) {
        const data : ProfessorDataCreateReceived = request.body;
        const file  = request.file as Express.Multer.File;

        data.foto = file 
        data.naturalidade.replace("\n\r","")
        data.enderecos.replace("\n\r","")
        data.contatos.replace("\n\r","")
        const naturality:NaturalidadeType = JSON.parse(data.naturalidade)
        const address : EnderecoType = JSON.parse(data.enderecos)
        const contacts : ContatoType = JSON.parse(data.contatos)

        const naturalidade = await prisma.municipio.findUnique({ where : {id : naturality.municipio_id}}).then( res =>res)

        if(!naturalidade){
            response.status(400).json( new BadRequestError("A Município da  natuaralidade não existe!"))
        }


        const endrer = await prisma.municipio.findUnique({ where : {id : naturality.municipio_id}}).then( res =>res)

        if(!endrer){
            response.status(400).json( new BadRequestError("A Município do endereço não existe!"))
        }

        const dataCreation : ProfessorDataCreate = {
            nome : data.nome,
            data_nascimento : data.data_nascimento,
            foto : file,
            naturalidade : naturality, 
            contatos : contacts,
            enderecos : address
        }

        return await service.add(dataCreation)
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
        const data : ProfessorDataUpdate = request.body;

        if(!validate(id)){
            response.status(400).json( new BadRequestError("Id invalido"))
        }

        const professor = await prisma.professor.findUnique( { where : {id}}).then(resp => resp)

        if(!professor){
            response.status(400).json( new BadRequestError("Estudante não encontrado!"))
        }
        
        if(data.naturalidade && data.naturalidade.id){
            if(!validate(data.naturalidade.id)){
                response.status(400).json( new BadRequestError("Id invalido da naturalidade! "))
            }else {
                const naturalidade = await prisma.naturalidade.findUnique({ where : {id : data.naturalidade.id}}).then( res => res)
        
                if(!naturalidade){
                    response.status(400).json( new BadRequestError("Naturalidade não existe!"))
                }
            }
        }

        if(data.naturalidade && data.naturalidade.municipio_id){
            if(!validate(data.naturalidade.municipio_id!)){
                response.status(400).json( new BadRequestError("Id invalido do municipio na naturalidade!"))
            }else {
                const municipio = await prisma.municipio.findUnique({ where : {id: data.naturalidade.municipio_id}}).then( res =>res)
    
                if(!municipio){
                    response.status(400).json( new BadRequestError("O Município da  natuaralidade não existe!"))
                }
            }
        }

        if(data.contatos ){
            if(!validateContato(data.contatos)){
                response.status(400).json( new BadRequestError("Id invalido do contato! "))
            }else {
                const contato = await prisma.contato.findUnique({
                    where : {
                        id : data.contatos[0].id
                    }
                }).then( res => res)
        
                if(!contato){
                    response.status(400).json( new BadRequestError("Contato não existe!"))
                }
            }
        }

        if(data.naturalidade && data.naturalidade.municipio_id){
            if(!validate(data.naturalidade.municipio_id!)){
                response.status(400).json( new BadRequestError("Id invalido do municipio na naturalidade!"))
            }else {
                const municipio = await prisma.municipio.findUnique({ where : {id: data.naturalidade.municipio_id}}).then( res =>res)
    
                if(!municipio){
                    response.status(400).json( new BadRequestError("O Município da  natuaralidade não existe!"))
                }
            }
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
        const searchParams : Partial<SearchParamsData> = request.query;
        return await service.get( searchParams )
        .then( res => {
            response.status(200).json(res)
        })
        .catch(error => {
            response.status(400).json({sms : "Erro" , error : error})
        })
    }

    public async getProfessoresTurma( request :Request , response : Response) {
        const id : string = request.params.id;

        if(!validate(id)){
            response.status(400).json( new BadRequestError("Id invlido!"))
        }

        const turma = await prisma.turma.findUnique( {where: {id : id}}).then( res => res);

        if(!turma){
            response.status(400).json( new BadRequestError("Não existe esta turma"))
        }

        return await service.getProfessoresTurma(id)
        .then( resp => {
            return response.status(200).json(resp)
        })
        .catch( error => {
            return response.status(400).json(error)
        })
    }

    /**
     * find
     */
    public async find( request :Request , response : Response) {
        const professor_id : string = request.params.id;

        if(!validate(professor_id)){
            response.status(400).json( new BadRequestError("Id invlido!"))
        }

        return await service.find(professor_id)
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
        const professor_id :string = request.params.id;
        
        return await service.delete(professor_id)
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


function validateEnderecoMunicipio(  datas : EnderecoDate[]){
    return datas.every( async (ender) => {
        const find = await prisma.municipio.findUnique( { where : { id : ender.municipio_id  }}).then( res => res);
        return find !==null
    })
}
function validateContato(  datas : ContatoDate[]){

    return datas.every( async (ender) => {
        const find = await prisma.municipio.findUnique( { where : { id : ender.id  }}).then( res => res);
        return find !==null
    })
}