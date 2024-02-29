import { PrismaClient } from "@prisma/client";
import { EstudanteDataUpdate, ImageData } from "../../Repositories/users/Estudante.repository";
import professorRepository, { ProfessorData, ProfessorDataCreate, ResponseData, SearchParamsData } from "../../Repositories/users/Professor.Repository";


const prisma = new PrismaClient();

export class ProfessorService implements professorRepository{

    public async add(data: ProfessorDataCreate):Promise<ProfessorDataCreate>{
        const {nome , data_nascimento , contatos ,enderecos , naturalidade ,foto , } = data;
        const fotoCrete : ImageData = {path : `/files/${foto.filename}`};

        return await prisma.professor.create( {
            data : {
                nome ,
                data_nascimento,
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

    public async update(data: Partial<EstudanteDataUpdate>) : Promise<ProfessorDataCreate>{
        const {id, nome , data_nascimento , turma_id , contatos ,enderecos , naturalidade} = data;

        return await prisma.professor.update( {
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

    public async get(searchParams : Partial<SearchParamsData>) : Promise<ResponseData>{
        const {distrito,municipio_id,rua,turma_id} =  searchParams;

        const count = await prisma.professor.count();
        const perPage: number = searchParams.perPage ? Number(searchParams.perPage) : 5;
        const currentPage = searchParams.currentPage  ? Number(searchParams.currentPage) : 1;
        const lastPage = Math.ceil(Number(count)/perPage);
        const nextPage = (currentPage+1)<= lastPage ? currentPage+1: null;
        const previousPage = (currentPage>1) ? currentPage-1  :null
        const jump = (currentPage-1)*perPage;

        return await prisma.professor.findMany({
            skip : jump,
            take : perPage,
            where : {
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
            }
        })
        .then(response => {
            return {
                professores: response,
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

    public async find (professor_id: string) : Promise<ProfessorDataCreate>{
        return await prisma.professor.findUnique({
            where : {
                id : professor_id
            },
            include:{
                contatos : true,
                naturalidade : true,
                endereco:true,
                turmas_professor : {
                    include : {
                        turma : true,
                        disciplina : true
                    }
                },
                foto : true
            }
        }).then( response =>response)
        .catch( error => error);
    };

    public async getProfessoresTurma (turma_id: string) : Promise<ProfessorData>{
        return await prisma.professor.findMany({
            where : {
                turmas_professor : {
                    some : {
                        turma_id 
                    }
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
    };

    public async delete (professor_id: string):Promise<ProfessorData>{
        return await prisma.professor.delete( {
            where : {
                id : professor_id
            }
        }).then( response =>response)
        .catch( error =>error)
    };
}