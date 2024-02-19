import { PrismaClient } from "@prisma/client";
import { DeleteSms } from "../../Repositories/localiteis/Pais.repository";
import ProvinciaRepository, { ProvinciaCreateData, ProvinciaData, ResponseDataProvincia, SearchParamsDataProvincia } from "../../Repositories/localiteis/Provincia.repository";

const prisma = new PrismaClient();

export class ProvinciaService implements ProvinciaRepository{
    public async add (data: ProvinciaCreateData) : Promise<ProvinciaData>{
        return await prisma.provincia.create({
            data : data
        })
        .then( response => response)
        .catch( error => error);
    };
    public async update (data: Partial<ProvinciaCreateData>) : Promise<ProvinciaData>{
        const {id:_ , ...newData } = data;
        return await prisma.provincia.update({
            data : newData,
            where : {
                id : data.id!
            }
        })
        .then( response => response)
        .catch( error => error)
    };

    public async get ( searchParams : Partial<SearchParamsDataProvincia>) : Promise<ResponseDataProvincia>{
        const count = await prisma.provincia.count();
        const perPage: number = searchParams.perPage ? Number(searchParams.perPage) : 5;
        const currentPage = searchParams.currentPage  ? Number(searchParams.currentPage) : 1;
        const lastPage = Math.ceil(Number(count)/perPage);
        const nextPage = (currentPage+1)<= lastPage ? currentPage+1: null;
        const previousPage = (currentPage>1) ? currentPage-1  :null
        const jump = (currentPage-1)*perPage;
        return await prisma.provincia.findMany({
            skip : jump,
            take : perPage,
        })
        .then(response => {
            return {
                provincias: response,
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
    public async find (provincia_id: string) : Promise<ProvinciaData>{
        return await prisma.provincia.findUnique( {
            where : {
                id : provincia_id
            },
            include : {
                municipios : true
            }
        })
        .then( response => response)
        .catch( error => error)
    };
    public async delete (provincia_id: string) : Promise<DeleteSms | Error>{
        return await prisma.provincia.delete( {
            where : {
                id : provincia_id
            }
        }).then( (res) =>  { sms : "Eliminado com sucesso"} )
        .catch( error => error)
    };

}
