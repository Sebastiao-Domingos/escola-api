import { Pais } from "@prisma/client";
import { TurmaData } from "./Turma.repositories";

export type CursoCreateData={
    id? : string
    nome : string
}

export type CursoData = {
    id : string
    nome : string
    createdAt? : Date
    updaatedAt? :Date
    turmas?:TurmaData[]
}

export type DeleteSms = {
    status : number
    sms : string
}

export default interface CursoRepository {
    add : (data : CursoCreateData) => Promise<CursoData>;
    update : (data : Partial<CursoCreateData>) => Promise<CursoData>;
    get : () => Promise<CursoData[]>,
    find : ( pais_id : string ) => Promise<CursoData>
    delete : ( pais_id : string ) => Promise<DeleteSms | Error>
}