import { PrismaClient } from "@prisma/client";
import TurmaRepository, { TurmaCreateData, TurmaData } from "../../Repositories/school/Turma.repositories";
import { DeleteSms } from "../../Repositories/localiteis/Pais.repository";
import { validate } from "uuid";

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
