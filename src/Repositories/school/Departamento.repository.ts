import { Curso, Estudante } from "@prisma/client";
import { DeleteSms } from "../localiteis/Pais.repository";

export type DepartamentoCreateData={
    id? : string
    nome : string
    codigo : string
}

export type Departamento={
    id? : string
    nome : string
    codigo : string
    createdAt : Date
    updatedAt : Date
}

export type DepartamentoData = {
    id : string
    nome : string
    codigo : string
    createdAt? : Date
    updaatedAt? :Date
    professores? : Estudante[]
    cursos ? : Curso[]
}

export default interface DepartamentoRepository {
    add : (data : DepartamentoCreateData) => Promise<Departamento>;
    update : (data : Partial<DepartamentoCreateData>) => Promise<Departamento>;
    get : () => Promise<Departamento[]>,
    find : ( pais_id : string ) => Promise<DepartamentoData>
    delete : ( pais_id : string ) => Promise<DeleteSms | Error>
}