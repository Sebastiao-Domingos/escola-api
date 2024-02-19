import { PrismaClient } from "@prisma/client";
import AlunoRepository, { AlunoData, ResponseData, SearchParamsData } from "../../Repositories/users/Estudante.repository";


const prisma = new PrismaClient();
export class EstudanteService implements AlunoRepository{

    public async add(data: AlunoData):Promise<AlunoData>{
        return await prisma.estudante.create( {
            data : data
        }).then( response => response)
        .catch( error => error);
    };
    public async update(data: Partial<AlunoData>) : Promise<AlunoData>{
        return await prisma.estudante.update({
            data : data,
            where : {
                id : data.id
            }
        }).then( response => response)
        .catch( error =>error);
    };
    public async get(searchParams : Partial<SearchParamsData>) : Promise<ResponseData>{
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
        })
        .then(response => {
            return {
                alunos: response,
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
    public async find (aluno_id: string) : Promise<AlunoData>{
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