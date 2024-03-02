import { Request, Response } from "express";
import bcrypt from "bcrypt"
import { ContatoType, EnderecoType, NaturalidadeType } from "../../Repositories/users/Estudante.repository";
import { validate } from "uuid";
import { BadRequestError } from "../../helpers/api-error";
import {  PrismaClient } from "@prisma/client";
import { AdministradorService } from "../../services/users/Administrador.service";
import { AdministradorDataCreate, AdministradorDataCreateReceived, AdministradorDataUpdate, SearchAdministrador } from "../../Repositories/users/Administrador.repository";
import { validateContato } from "../../helpers/functions/validators";

const service = new AdministradorService();

const prisma = new PrismaClient();
export class AdministradorController{
    /**
     * create
     */
    public async create( request : Request, response : Response) {
        const data : AdministradorDataCreateReceived = request.body;
        const file  = request.file as Express.Multer.File;

        data.foto = file 
        const count = await prisma.administrador.count();
        data.naturalidade.replace("\n\r","")
        data.enderecos.replace("\n\r","")
        data.contatos.replace("\n\r","")
        const naturality:NaturalidadeType = JSON.parse(data.naturalidade)
        const address : EnderecoType = JSON.parse(data.enderecos)
        const contacts : ContatoType = JSON.parse(data.contatos)

        
        if(!validate(naturality.municipio_id) || !validate(address.municipio_id)){
            response.status(400).json( new BadRequestError("Id invalido!"))
        }
        
        const naturalidade = await prisma.municipio.findUnique({ where : {id : naturality.municipio_id}}).then( res =>res)

        if(!naturalidade){
            response.status(400).json( new BadRequestError("A Município da  natuaralidade não existe!"))
        }

        const endrer = await prisma.municipio.findUnique({ where : {id : naturality.municipio_id}}).then( res =>res)

        if(!endrer){
            response.status(400).json( new BadRequestError("A Município do endereço não existe!"))
        }

        const saltRounds = 10;

        const hash = await bcrypt.hash( data.senha, saltRounds).then( res => res);
        
        const dataCreation :AdministradorDataCreate = {
            nome : data.nome,
            data_nascimento : data.data_nascimento,
            foto : file,
            senha : hash,
            naturalidade : naturality, 
            contatos : contacts,
            enderecos : address,
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
        const data : AdministradorDataUpdate = request.body;

        if(!id){
            response.status(400).json( new BadRequestError("Id invalido do estudante"))
        }

        if(!validate(id)){
            response.status(400).json( new BadRequestError("Id invalido do estudante"))
        }

        const estudante = await prisma.estudante.findUnique( { where : {id}}).then( res => res);

        if(!estudante){
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
        const searchParams : Partial<SearchAdministrador> = request.query;
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
        const admin_id : string = request.params.id;

        if(!validate(admin_id)){
            response.status(400).json( new BadRequestError("Id invlido!"))
        }

        return await service.find(admin_id)
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
        const admin_id :string = request.params.id;
        
        return await service.delete(admin_id)
        .then( res => {
            response.status(200).json(res);
        })
        .catch( error => {
            response.status(400).json(error)
        })
    }
}
