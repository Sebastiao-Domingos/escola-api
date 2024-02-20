import { PrismaClient } from "@prisma/client";
import EstudanteRepository, { AlunoData, EstudanteDataCreate, ResponseData, SearchParamsData } from "../../Repositories/users/Estudante.repository";


const prisma = new PrismaClient();
export class EstudanteService implements EstudanteRepository{

    public async add(data: EstudanteDataCreate):Promise<EstudanteDataCreate>{
        const {nome , data_nascimento , turma_id , contatos ,enderecos , naturalidade} = data;
        return await prisma.estudante.create( {
            data : {
                nome ,
                data_nascimento,
                turma_id,
                contatos : {
                    create : contatos
                },
                endereco : {
                    create :enderecos
                },
                naturalidade : {
                    create : naturalidade
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
    // public async update(data: Partial<EstudanteDataCreate>) : Promise<EstudanteDataCreate>{
    //     // return await prisma.estudante.update().then( response => response)
    //     // .catch( error =>error);

    //     return 
    // };
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
    public async find (aluno_id: string) : Promise<EstudanteDataCreate>{
        return await prisma.estudante.findUnique({
            where : {
                id : aluno_id
            }
        }).then( response =>response)
        .catch( error => error);
    };
    public async delete (aluno_id: string):Promise<AlunoData>{
        return await prisma.estudante.delete( {
            where : {
                id : aluno_id
            }
        }).then( response =>response)
        .catch( error =>error)
    };
}