import { Pais } from "@prisma/client";

export type AnoCreateData={
    id? : string
    valor : number
}

export type AnoData = {
    id : string
    valor : number
    createdAt? : Date
    updaatedAt? :Date
    turmas? : {
        id : string
        valor : number
        createdAt? : Date
        updaatedAt? :Date
    }[]
}

export type DeleteSms = {
    sms : string
}

export default interface AnoRepository {
    add : (data : AnoCreateData) => Promise<AnoData>;
    update : (data : Partial<AnoCreateData>) => Promise<AnoData>;
    get : () => Promise<AnoData[]>,
    find : ( pais_id : string ) => Promise<AnoData>
    delete : ( pais_id : string ) => Promise<DeleteSms | Error>
}