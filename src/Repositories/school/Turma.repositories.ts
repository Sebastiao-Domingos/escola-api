import { Pais } from "@prisma/client";
import { DeleteSms } from "../localiteis/Pais.repository";

export type TurmaCreateData={
    id? : string
    nome : string
    ano_academico_id: string
}

export type TurmaData = {
    id : string
    nome : string
    ano_academico_id: string
    createdAt? : Date
    updaatedAt? :Date
    estudantes? : {
        id : string
        nome : number
        createdAt? : Date
        updaatedAt? :Date
    }[]
}

export default interface TurmaRepository {
    add : (data : TurmaCreateData) => Promise<TurmaData>;
    update : (data : Partial<TurmaCreateData>) => Promise<TurmaData>;
    get : () => Promise<TurmaData[]>,
    find : ( pais_id : string ) => Promise<TurmaData>
    delete : ( pais_id : string ) => Promise<DeleteSms | Error>
}