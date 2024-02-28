import { Pais } from "@prisma/client";
import { DeleteSms } from "../localiteis/Pais.repository";

export type EscolherProfessorCreateData={
    id? : string
    turma_id: string
    professor_id :string
    disciplina_id : string
}

export type EscolherProfessorData = {
    id : string
    turma_id: string
    professor_id :string
    disciplina_id : string
    createdAt? : Date
    updaatedAt? :Date
}

export default interface EscolherProfessorRepository {
    add : (data : EscolherProfessorCreateData) => Promise<EscolherProfessorData>;
    update : (data : Partial<EscolherProfessorCreateData>) => Promise<EscolherProfessorData>;
    get : () => Promise<EscolherProfessorData[]>,
    find : ( pais_id : string ) => Promise<EscolherProfessorData>
    delete : ( pais_id : string ) => Promise<DeleteSms | Error>
}