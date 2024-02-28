import { PrismaClient } from "@prisma/client";
import { DeleteSms } from "../../Repositories/localiteis/Pais.repository";
import DisciplinaRepository, { DisciplinaCreateData, DisciplinaData, ResponseDataDisciplina, SearchParamsDataDisciplina } from "../../Repositories/school/Disciplina.repository";
const prisma = new PrismaClient();

export class DisciplinaService implements DisciplinaRepository{

    public async add (data: DisciplinaCreateData) : Promise<DisciplinaData>{

        return await prisma.disciplina.create({
            data : data
        })
        .then( response => response)
        .catch( error => error);
    };
    
    public async update (data: Partial<DisciplinaCreateData>) : Promise<DisciplinaData>{

        const {id:_ , ...newData } = data;
        return await prisma.disciplina.update({
            data : newData,
            where : {
                id : data.id!
            }
        })
        .then( response => response)
        .catch( error => error)
    };

    public async get(parmas : Partial<SearchParamsDataDisciplina>) : Promise<ResponseDataDisciplina>{
        const { professor_id ,turma_id } =  parmas;
        const count = await prisma.disciplina.count();
        const perPage: number = parmas.perPage ? Number(parmas.perPage) : 5;
        const currentPage = parmas.currentPage  ? Number(parmas.currentPage) : 1;
        const lastPage = Math.ceil(Number(count)/perPage);
        const nextPage = (currentPage+1)<= lastPage ? currentPage+1: null;
        const previousPage = (currentPage>1) ? currentPage-1  :null
        const jump = (currentPage-1)*perPage;

        return await prisma.disciplina.findMany({
            skip : jump,
            take : perPage,
            where : {
                turma_professor : {
                    every : {
                        professor_id : professor_id,
                        turma_id : turma_id
                    }
                }
            }
        })
        .then(response => {
            return {
                disciplinas : response,
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
    public async find (disciplina_id: string) : Promise<DisciplinaData>{
        return await prisma.disciplina.findUnique( {
            where : {
                id : disciplina_id
            },
            include : {
                turma_professor : {
                    include :{
                        turma : true,
                        professor : true
                    }
                }
            }
        })
        .then( response => response)
        .catch( error => error)
    };

    public async delete (disciplina_id: string) : Promise<DeleteSms | Error>{
        return await prisma.disciplina.delete( {
            where : {
                id : disciplina_id
            }
        }).then( (res) =>  { sms : "Eliminado com sucesso"} )
        .catch( error => error)
    };

}
