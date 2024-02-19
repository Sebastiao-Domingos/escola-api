import { Pais } from "@prisma/client";

export type PaisCreateData={
    id? : string
    nome : string
}

export type PaisData = {
    id : string
    nome : string
    createdAt? : Date
    updaatedAt? :Date
    provincias? : {
        id : string
        nome : string
        createdAt? : Date
        updaatedAt? :Date
        municipios? : {
            id : string
            nome : string
            createdAt? : Date
            updaatedAt? :Date
        }[]
    }[]
}

export type DeleteSms = {
    sms : string
}

export default interface PaisRepository {
    add : (data : PaisCreateData) => Promise<PaisData>;
    update : (data : Partial<PaisCreateData>) => Promise<PaisData>;
    get : () => Promise<PaisData[]>,
    find : ( pais_id : string ) => Promise<PaisData>
    delete : ( pais_id : string ) => Promise<DeleteSms | Error>
}