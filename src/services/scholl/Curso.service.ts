import { PrismaClient } from "@prisma/client";
import CursoRepository, { CursoCreateData, CursoData, DeleteSms } from "../../Repositories/school/Curso.repository";

const prisma = new PrismaClient();

export class CursoService implements CursoRepository{
    public async add (data:CursoCreateData) : Promise<CursoData>{
        return await prisma.curso.create({
            data : data
        })
        .then( response => response)
        .catch( error => error);
    };
    public async update (data: Partial<CursoCreateData>) : Promise<CursoData>{
        const {id:_ , ...newData } = data;
        return await prisma.curso.update({
            data : newData,
            where : {
                id : data.id!
            }
        })
        .then( response => response)
        .catch( error => error)
    };

    public async get () : Promise<CursoData[]>{
        return await prisma.curso.findMany()
        .then( response => response)
        .catch( error => error)
    };
    public async find (curso_id: string) : Promise<CursoData>{
        return await prisma.curso.findUnique( {
            where : {
                id : curso_id
            },
            include : {
                turmas : true
            }
        })
        .then( response => response)
        .catch( error => error)
    };
    
    public async delete (curso_id: string) : Promise<DeleteSms | Error>{
        return await prisma.curso.delete( {
            where : {
                id : curso_id
            }
        }).then( (res) =>  { sms : "Eliminado com sucesso"} )
        .catch( error => error)
    };
}
