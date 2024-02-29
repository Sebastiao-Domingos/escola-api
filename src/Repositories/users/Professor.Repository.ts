import { ContatoDate, EnderecoDate, NaturalidadeDate } from "./Estudante.repository"


export type ProfessorData = {
    id? : string 
    nome :string
    data_nascimento : Date,
    createdAt? : Date
    updatedAt? : Date
}

export type ProfessorDataCreate = {
    nome: string,
    data_nascimento: Date,
    foto : Express.Multer.File
    createdAt? : Date
    updatedAt? : Date
    contatos: 
      {
        nome: string,
        valor: string,
        createdAt? : Date
        updatedAt? : Date
      }
    ,
    naturalidade: {
      naturalidade: string,
      municipio_id: string,
      createdAt? : Date
      updatedAt? : Date
    },
    enderecos: 
      {
        municipio_id: string,
        distrito: string,
        rua: string,
        ponto_de_referencia: string,
        createdAt? : Date
        updatedAt? : Date
      }
}

export type ProfessorDataCreateReceived = {
  nome: string,
  data_nascimento: Date,
  foto : Express.Multer.File
  createdAt? : Date
  updatedAt? : Date
  contatos: string,
  naturalidade: string
  enderecos: string
}

export type ProfessorDataUpdate = {
  id: string
  nome: string,
  data_nascimento: Date,
  turma_id: string,
  contatos:ContatoDate[],
  naturalidade: NaturalidadeDate,
  enderecos:EnderecoDate[]
}

export type ResponseData ={
    professores : ProfessorDataCreate[]
    perPage : number
    previousPage : number | null
    currentPage : number,
    nextPage : number | null
    lastPage : number | null
    total : number
}

export type SearchParamsData = {
    perPage : number
    currentPage : number
    turma_id :string,
    municipio_id: string,
    distrito : string
    rua :string 
}

export default interface professorRepository {
    add:(data : ProfessorDataCreate) => Promise<ProfessorDataCreate>
    update:(data:Partial<ProfessorDataUpdate>) => Promise<ProfessorDataCreate>
    get:(searchParams : Partial<SearchParamsData>) => Promise<ResponseData>
    getProfessoresTurma:(turma_id : string) => Promise<ProfessorData>
    find :(aluno_id:string) => Promise<ProfessorData>
    delete:(aluno_id : string ) => Promise<ProfessorData>
}