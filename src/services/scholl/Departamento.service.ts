import {PrismaClient } from "@prisma/client";
import { DeleteSms } from "../../Repositories/localiteis/Pais.repository";
import DepartamentoRepository, { Departamento, DepartamentoCreateData, DepartamentoData } from "../../Repositories/school/Departamento.repository";

const prisma = new PrismaClient();

export class DepartamentoService implements DepartamentoRepository{
    public async add (data: DepartamentoCreateData) : Promise<Departamento>{
        return await prisma.departamento.create({
            data : data
        })
        .then( response => response)
        .catch( error => error);
    };
    
    public async update (data: Partial<DepartamentoCreateData>) : Promise<Departamento>{
        const {id:_ , ...newData } = data;
        return await prisma.departamento.update({
            data : newData,
            where : {
                id : data.id!
            }
        })
        .then( response => response)
        .catch( error => error)
    };

    public async get () : Promise<Departamento[]>{
        return await prisma.departamento.findMany()
        .then( response => response)
        .catch( error => error)
    };
    public async find (departamento_id: string) : Promise<DepartamentoData>{
        return await prisma.departamento.findUnique( {
            where : {
                id : departamento_id
            },
            include : {
                professores : true,
                cursos : true
            }
        })
        .then( response => response)
        .catch( error => error)
    };
    public async delete (departamneto_id: string) : Promise<DeleteSms | Error>{
        return await prisma.departamento.delete( {
            where : {
                id : departamneto_id
            }
        }).then( (res) =>  { sms : "Eliminado com sucesso"} )
        .catch( error => error)
    };

}
