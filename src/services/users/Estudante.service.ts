import { Disciplina, PrismaClient } from "@prisma/client";
import EstudanteRepository, { AlunoData, EstudanteDataCreate, EstudanteDataUpdate, ImageData, ResponseData, SearchParamsData } from "../../Repositories/users/Estudante.repository";
import { DeleteSms } from "../../Repositories/localiteis/Pais.repository";
import { NotaCreateData } from "../../Repositories/school/classroom/Nota.repository";


const prisma = new PrismaClient();

export class EstudanteService implements EstudanteRepository{

    public async add(data: EstudanteDataCreate):Promise<EstudanteDataCreate>{
        const {nome , data_nascimento , turma_id , contatos ,enderecos , naturalidade ,foto, numero_processo} = data;
        const fotoCrete : ImageData = {path : `/files/${foto.filename}`};

        return await prisma.estudante.create( {
            data : {
                nome ,
                data_nascimento,
                turma_id,
                numero_processo,
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

    public async update(data: Partial<EstudanteDataUpdate>) : Promise<EstudanteDataCreate>{
        const {id, nome , data_nascimento , turma_id , contatos ,enderecos , naturalidade} = data;
        // if( contatos ){
        //     await prisma.contato.updateMany({
        //         where : {
        //             OR : id  contatos.map( contato => contato.id)
        //         },

        //     })
        // }
        return await prisma.estudante.update( {
             where :{
                id
             },
            data : {
                nome ,
                data_nascimento,
                turma_id,
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

    public async get(searchParams : Partial<SearchParamsData>) : Promise<ResponseData>{
        const {distrito,municipio_id,rua,turma_id} =  searchParams;

        const count = await prisma.estudante.count();
        const perPage: number = searchParams.perPage ? Number(searchParams.perPage) : 5;
        const currentPage = searchParams.currentPage  ? Number(searchParams.currentPage) : 1;
        const lastPage = Math.ceil(Number(count)/perPage);
        const nextPage = (currentPage+1)<= lastPage ? currentPage+1: null;
        const previousPage = (currentPage>1) ? currentPage-1  :null
        const jump = (currentPage-1)*perPage;
        return await prisma.estudante.findMany({
            skip : jump,
            take : perPage,
            where : {
                turma : { id : turma_id},
                endereco : { 
                    some : {
                        distrito,
                        municipio_id,
                        rua
                    }
                },
            },
            include:{
                naturalidade : true,
                turma : true
            },
            orderBy : {
                numero_processo : "asc"
            }
        })
        .then(response => {
            return {
                estudantes: response,
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

    public async find (estudante_id: string) : Promise<EstudanteDataCreate>{
        return await prisma.estudante.findUnique({
            where : {
                id : estudante_id
            },
            include:{
                contatos : true,
                naturalidade : true,
                endereco:true,
                turma : {
                    include :{
                        curso : true,
                        ano_academico : true
                    }
                },
                foto : true
            }
        }).then( response =>response)
        .catch( error => error);
    };

    public async getEstudantesTurma (turma_id: string) : Promise<EstudanteDataCreate>{
        return await prisma.estudante.findMany({
            where : {
                turma : {
                    id : turma_id
                }
            },
            include:{
                contatos : true,
                naturalidade : true,
                endereco:true,
                foto : true
            }
        }).then( response =>response)
        .catch( error => error);
    }

    public async getNotasEstudante (estudante_id: string) : Promise<NotaCreateData[]>{
        return await prisma.nota.findMany({
            where : {
                estudante : {
                    id : estudante_id
                }
            }
        }).then( response =>response)
        .catch( error => error);
    }
    
    public async getDisciplinasEstudante (estudante_id: string) : Promise<Disciplina[]>{
        return await prisma.disciplina.findMany({
            where : {
                notas: {
                    some : {
                        estudante_id
                    }
                }
            }
        }).then( response =>response)
        .catch( error => error);
    }
    
    
    public async delete (estudante_id: string):Promise<DeleteSms>{
        return await prisma.estudante.delete( {
            where : {
                id : estudante_id
            }
        }).then( () => {sms : "Eliminado com sucesso"})
        .catch( error =>error)
    };
}