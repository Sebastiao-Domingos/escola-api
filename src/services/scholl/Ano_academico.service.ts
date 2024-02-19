import { PrismaClient } from "@prisma/client";
import AnoRepository, { AnoCreateData, AnoData, DeleteSms } from "../../Repositories/school/Ano_academico.repositories";

const prisma = new PrismaClient();

export class AnoAcademicoService implements AnoRepository{
    public async add (data: AnoCreateData) : Promise<AnoData>{
        return await prisma.ano_academico.create({
            data : data
        })
        .then( response => response)
        .catch( error => error);
    };
    public async update (data: Partial<AnoCreateData>) : Promise<AnoData>{
        const {id:_ , ...newData } = data;
        return await prisma.ano_academico.update({
            data : newData,
            where : {
                id : data.id!
            }
        })
        .then( response => response)
        .catch( error => error)
    };

    public async get () : Promise<AnoData[]>{
        return await prisma.ano_academico.findMany()
        .then( response => response)
        .catch( error => error)
    };
    public async find (ano_id: string) : Promise<AnoData>{
        return await prisma.ano_academico.findUnique( {
            where : {
                id : ano_id
            },
            include : {
                turmas:{
                    include:{
                        estudantes : true
                    }
                }
            }
        })
        .then( response => response)
        .catch( error => error)
    };
    public async delete (ano_id: string) : Promise<DeleteSms | Error>{
        return await prisma.ano_academico.delete( {
            where : {
                id : ano_id
            }
        }).then( (res) =>  { sms : "Eliminado com sucesso"} )
        .catch( error => error)
    };

}
