import { PrismaClient } from "@prisma/client";
import { DeleteSms } from "../../Repositories/localiteis/Pais.repository";
import EscolherProfessorRepository, { EscolherProfessorCreateData, EscolherProfessorData } from "../../Repositories/school/EscolherProfessor.repository";

const prisma = new PrismaClient();

export class EscolherProfessorService implements EscolherProfessorRepository{
    public async add (data: EscolherProfessorCreateData) : Promise<EscolherProfessorData>{
        return await prisma.turmaProfessor.create({
            data : data
        })
        .then( response => response)
        .catch( error => error);
    };
    
    public async update (data: Partial<EscolherProfessorCreateData>) : Promise<EscolherProfessorData>{
        const {id:_ , ...newData } = data;
        return await prisma.turmaProfessor.update({
            data : newData,
            where : {
                id : data.id!
            }
        })
        .then( response => response)
        .catch( error => error)
    };

    public async get () : Promise<EscolherProfessorData[]>{
        return await prisma.turmaProfessor.findMany()
        .then( response => response)
        .catch( error => error)
    };
    public async find (esc_prof_id: string) : Promise<EscolherProfessorData>{
        return await prisma.turmaProfessor.findUnique( {
            where : {
                id : esc_prof_id
            },
            include : {
                disciplina : true,
                professor : true
            }
        })
        .then( response => response)
        .catch( error => error)
    };
    public async delete (esc_prof_id: string) : Promise<DeleteSms | Error>{
        return await prisma.turmaProfessor.delete( {
            where : {
                id : esc_prof_id
            }
        }).then( (res) =>  { sms : "Eliminado com sucesso"} )
        .catch( error => error)
    };

}
