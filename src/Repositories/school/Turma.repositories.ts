import { Pais } from "@prisma/client";
import { DeleteSms } from "../localiteis/Pais.repository";
import { ResponseData } from "../users/Estudante.repository";

export type TurmaCreateData={
    id? : string
    nome : string
    turno : string
    ano_academico_id: string
    curso_id :string
}

export type TurmaData = {
    id : string
    nome : string
    turno : string
    ano_academico_id: string
    curso_id :string
    createdAt? : Date
    updaatedAt? :Date
    estudantes? : {
        id : string
        nome : number
        createdAt? : Date
        updaatedAt? :Date
    }[]
}

export type SearchParamsData = {
    perPage : number
    currentPage : number
    municipio_id: string,
    distrito : string
    rua :string 
}

export default interface TurmaRepository {
    add : (data : TurmaCreateData) => Promise<TurmaData>;
    update : (data : Partial<TurmaCreateData>) => Promise<TurmaData>;
    get : () => Promise<TurmaData[]>,
    getEstudantes:(turma_id : string, params : Partial<SearchParamsData>) => Promise<ResponseData>
    find : ( pais_id : string ) => Promise<TurmaData>
    delete : ( pais_id : string ) => Promise<DeleteSms | Error>
}