import { DeleteSms } from "../Ano_academico.repositories";

export type NotaCreateData={
    id? : string
    valor: number
    disciplina_id : string,
    estudante_id : string,
    createdAt? : Date,
    updatedAt ? : Date
}

export default interface NotaRepository {
    add : (data : NotaCreateData) => Promise<NotaCreateData>;
    update : (data : Partial<NotaCreateData>) => Promise<NotaCreateData>;
    get : () => Promise<NotaCreateData[]>,
}