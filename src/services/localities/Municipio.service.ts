import { PrismaClient } from "@prisma/client";
import { DeleteSms } from "../../Repositories/localiteis/Pais.repository";
import MunicipioRepository, { MunicipioCreateData, MunicipioData, ResponseDataMunicipio, SearchParamsDataMunicipio } from "../../Repositories/localiteis/Municipio.repository";

const prisma = new PrismaClient();

export class MunicipioService implements MunicipioRepository{
    public async add (data: MunicipioCreateData) : Promise<MunicipioData>{
        return await prisma.municipio.create({
            data : data
        })
        .then( response => response)
        .catch( error => error);
    };
    public async update (data: Partial<MunicipioCreateData>) : Promise<MunicipioData>{
        const {id:_ , ...newData } = data;
        return await prisma.municipio.update({
            data : newData,
            where : {
                id : data.id!
            }
        })
        .then( response => response)
        .catch( error => error)
    };

    public async get ( searchParams : Partial<SearchParamsDataMunicipio>) : Promise<ResponseDataMunicipio>{
        const count = await prisma.municipio.count();
        const perPage: number = searchParams.perPage ? Number(searchParams.perPage) : 5;
        const currentPage = searchParams.currentPage  ? Number(searchParams.currentPage) : 1;
        const lastPage = Math.ceil(Number(count)/perPage);
        const nextPage = (currentPage+1)<= lastPage ? currentPage+1: null;
        const previousPage = (currentPage>1) ? currentPage-1  :null
        const jump = (currentPage-1)*perPage;

        return await prisma.municipio.findMany({
            skip : jump,
            take : perPage,
            where:{
                provincia_id:searchParams.provincia_id,
                provincia:{
                    id:searchParams.provincia_id,
                    nome : searchParams.nome_provincia,
                    pais : {
                        id : searchParams.pais_id,
                        nome : searchParams.nome_pais
                    }
                }
            }
        })
        .then(response => {
            return {
                municipios: response,
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
    public async find (municipio_id: string) : Promise<MunicipioData>{
        return await prisma.municipio.findUnique( {
            where : {
                id : municipio_id
            },
            include : {
                provincia: {
                    include : {
                        pais : true
                    }
                }
            }
        })
        .then( response => response)
        .catch( error => error)
    };
    public async delete (municipio_iid: string) : Promise<DeleteSms | Error>{
        return await prisma.municipio.delete( {
            where : {
                id : municipio_iid
            }
        }).then( () =>  { sms : "Eliminado com sucesso"} )
        .catch( error => error)
    };

}
