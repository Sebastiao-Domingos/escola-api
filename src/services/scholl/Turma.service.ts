import { PrismaClient } from "@prisma/client";
import TurmaRepository, { SearchParamsData, TurmaCreateData, TurmaData } from "../../Repositories/school/Turma.repositories";
import { DeleteSms } from "../../Repositories/localiteis/Pais.repository";
import { ResponseData } from "../../Repositories/users/Estudante.repository";

const prisma = new PrismaClient();

export class TurmaService implements TurmaRepository{
    public async add (data: TurmaCreateData) : Promise<TurmaData>{
        return await prisma.turma.create({
            data : data
        })
        .then( response => response)
        .catch( error => error);
    };
    
    public async update (data: Partial<TurmaCreateData>) : Promise<TurmaData>{
        const {id:_ , ...newData } = data;
        return await prisma.turma.update({
            data : newData,
            where : {
                id : data.id!
            }
        })
        .then( response => response)
        .catch( error => error)
    };

    public async get () : Promise<TurmaData[]>{
        return await prisma.turma.findMany()
        .then( response => response)
        .catch( error => error)
    };
    public async getEstudantes (id: string,params : Partial<SearchParamsData>) : Promise<ResponseData>{
        const {distrito,municipio_id,rua} =  params;
        const count = await prisma.estudante.findMany({
            where : {
                turma_id : id,
                endereco : {
                    every : {
                        municipio_id,
                        distrito,
                        rua
                    }
                }
            }
        }).then( res => res.length);
        const perPage: number = params.perPage ? Number(params.perPage) : 5;
        const currentPage = params.currentPage  ? Number(params.currentPage) : 1;
        const lastPage = Math.ceil(Number(count)/perPage);
        const nextPage = (currentPage+1)<= lastPage ? currentPage+1: null;
        const previousPage = (currentPage>1) ? currentPage-1  :null
        const jump = (currentPage-1)*perPage;
        
        return await prisma.estudante.findMany({
            skip : jump,
            take : perPage,
            where : {
                turma_id :id,
                endereco : { 
                    every : {
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
    }
    public async find (id: string) : Promise<TurmaData>{
        return await prisma.turma.findUnique( {
            where : {
                id : id
            },
            include : {
                estudantes : true,
                ano_academico : true,
                curso : true,
                turma_professor : {
                    include : {
                        disciplina :true
                    }
                }
            }
        })
        .then( response => response)
        .catch( error => error)
    };
    public async delete (ano_id: string) : Promise<DeleteSms | Error>{
        return await prisma.turma.delete( {
            where : {
                id : ano_id
            }
        }).then( (res) =>  { sms : "Eliminado com sucesso"} )
        .catch( error => error)
    };

}
