import { TurmaProfessor } from "@prisma/client";
import { DeleteSms } from "../localiteis/Pais.repository";

export type DisciplinaCreateData={
    id? : string
    nome : string
    carga : number
}

export type DisciplinaData = {
    id : string
    nome : string
    carga : number
    turma_professor : TurmaProfessor
}

export type ResponseDataDisciplina ={
    disciplinas : DisciplinaCreateData[]
    perPage : number
    previousPage : number | null
    currentPage : number,
    nextPage : number | null
    lastPage : number | null
    total : number
}

export type SearchParamsDataDisciplina = {
    perPage : number
    currentPage : number
    turma_id :string,
    professor_id: string
}

export default interface DisciplinaRepository {
    add : (data : DisciplinaCreateData) => Promise<DisciplinaData>;
    update : (data : Partial<DisciplinaCreateData>) => Promise<DisciplinaData>;
    get : ( params : Partial<SearchParamsDataDisciplina>) => Promise<ResponseDataDisciplina>,
    find : ( disciplina_id: string ) => Promise<DisciplinaData>
    delete : ( disciplina_id: string ) => Promise<DeleteSms | Error>
}