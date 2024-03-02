import {PrismaClient } from "@prisma/client";
import  { ImageData } from "../../Repositories/users/Estudante.repository";
import { DeleteSms } from "../../Repositories/localiteis/Pais.repository";
import AdministradorRepository, { AdministradorDataCreate, AdministradorDataUpdate, ResponseDataAdmin, SearchAdministrador } from "../../Repositories/users/Administrador.repository";


const prisma = new PrismaClient();

export class AdministradorService implements AdministradorRepository{

    public async add(data: AdministradorDataCreate):Promise<AdministradorDataCreate>{
        const {nome , data_nascimento  , contatos ,enderecos , naturalidade ,foto, senha} = data;
        const fotoCrete : ImageData = {path : `/files/${foto.filename}`};
        
        return await prisma.administrador.create( {
            data : {
                nome ,
                data_nascimento,
                senha,
                contatos : {
                    createMany :{
                        data:contatos
                    }
                },
                endereco : {
                    createMany :{
                        data :enderecos
                    }
                },
                naturalidade : {
                    create : naturalidade
                },
                foto : {
                    create : fotoCrete
                }
            },
            include : {
                endereco : true,
                naturalidade : true,
                contatos : true,
                foto : true
            }            
        }).then( response => response)
        .catch( error => error);
    };

    public async update(data: Partial<AdministradorDataUpdate>) : Promise<AdministradorDataCreate>{
        const {id, nome , data_nascimento ,senha, contatos ,enderecos , naturalidade} = data;
        // if( contatos ){
        //     await prisma.contato.updateMany({
        //         where : {
        //             OR : id  contatos.map( contato => contato.id)
        //         },

        //     })
        // }
        return await prisma.administrador.update( {
             where :{
                id
             },
            data : {
                nome ,
                data_nascimento,
                naturalidade : {
                    update : naturalidade
                },
                contatos : {
                    updateMany : {
                        where : {
                            estudante_id : id
                        },
                        data : [contatos]
                    }
                }
            },
            include : {
                endereco : true,
                naturalidade : true,
                contatos : true,
            }            
        }).then( response => response)
        .catch( error => error);
    };

    public async get(searchParams : Partial<SearchAdministrador>) : Promise<ResponseDataAdmin>{

        const count = await prisma.administrador.count();
        const perPage: number = searchParams.peerPage ? Number(searchParams.peerPage) : 5;
        const currentPage = searchParams.currentPage  ? Number(searchParams.currentPage) : 1;
        const lastPage = Math.ceil(Number(count)/perPage);
        const nextPage = (currentPage+1)<= lastPage ? currentPage+1: null;
        const previousPage = (currentPage>1) ? currentPage-1  :null
        const jump = (currentPage-1)*perPage;
        return await prisma.administrador.findMany({
            take : perPage,
            skip : jump,
            include:{
                contatos : true,
            }
        })
        .then(response => {
            return {
                administradores: response,
                perPage: perPage,
                previousPage: previousPage,
                currentPage: currentPage,
                nextPage: nextPage,
                lastPage: lastPage,
                total: count
            }
        })
        .catch( error =>error)
    };

    public async find (admin_id: string) : Promise<AdministradorDataCreate>{
        return await prisma.administrador.findUnique({
            where : {
                id : admin_id
            },
            include:{
                contatos : true,
                naturalidade : true,
                endereco:true,
                foto : true
            }
        }).then( response =>response)
        .catch( error => error);
    };
    
    public async delete (admin_id: string):Promise<DeleteSms>{
        return await prisma.administrador.delete( {
            where : {
                id : admin_id
            }
        }).then( () => {sms : "Eliminado com sucesso"})
        .catch( error =>error)
    };
}