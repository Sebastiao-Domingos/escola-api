import { PrismaClient } from "@prisma/client";
import PaisRepository, { DeleteSms, PaisCreateData, PaisData } from "../../Repositories/localiteis/Pais.repository";

const prisma = new PrismaClient();

export class PaisService implements PaisRepository{
    public async add (data: PaisCreateData) : Promise<PaisData>{
        return await prisma.pais.create({
            data : data
        })
        .then( response => response)
        .catch( error => error);
    };
    public async update (data: Partial<PaisCreateData>) : Promise<PaisData>{
        const {id:_ , ...newData } = data;
        return await prisma.pais.update({
            data : newData,
            where : {
                id : data.id!
            }
        })
        .then( response => response)
        .catch( error => error)
    };

    public async get () : Promise<PaisData[]>{
        return await prisma.pais.findMany()
        .then( response => response)
        .catch( error => error)
    };
    public async find (pais_id: string) : Promise<PaisData>{
        return await prisma.pais.findUnique( {
            where : {
                id : pais_id
            },
            include : {
                provincias : {
                    include : {
                        municipios : true
                    }
                }
            }
        })
        .then( response => response)
        .catch( error => error)
    };
    public async delete (pais_id: string) : Promise<DeleteSms | Error>{
        return await prisma.pais.delete( {
            where : {
                id : pais_id
            }
        }).then( (res) =>  { sms : "Eliminado com sucesso"} )
        .catch( error => error)
    };

}
