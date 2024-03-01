import { PrismaClient } from "@prisma/client";
import NotaRepository, { NotaCreateData } from "../../../Repositories/school/classroom/Nota.repository";

const prisma = new PrismaClient();

export class NotaService implements NotaRepository{
    public async add (data: NotaCreateData) : Promise<NotaCreateData>{
        return await prisma.nota.create({
            data : data
        })
        .then( response => response)
        .catch( error => error);
    };
    
    public async update (data: Partial<NotaCreateData>) : Promise<NotaCreateData>{
        const {id:_ , ...newData } = data;
        return await prisma.nota.update({
            data : newData,
            where : {
                id : data.id!
            }
        })
        .then( response => response)
        .catch( error => error)
    };

    public async get () : Promise<NotaCreateData[]>{
        return await prisma.nota.findMany()
        .then( response => response)
        .catch( error => error)
    };
}
