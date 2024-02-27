import { Multer } from "multer"


export type AlunoData = {
    id? : string 
    nome :string
    numero_processo? : number,
    data_nascimento : Date,
    turma_id : string
    createdAt? : Date
    updatedAt? : Date
}

export type EstudanteDataCreate = {
    nome: string,
    data_nascimento: Date,
    numero_processo : number,
    turma_id: string,
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

export type Naturalidade ={

}

export type ContatoType = 
  {
    nome: string,
    valor: string,
    createdAt? : Date
    updatedAt? : Date
  }

export type NaturalidadeType = {
  naturalidade: string,
  municipio_id: string,
  createdAt? : Date
  updatedAt? : Date
}
export type EnderecoType =
  {
    municipio_id: string,
    distrito: string,
    rua: string,
    ponto_de_referencia: string,
    createdAt? : Date
    updatedAt? : Date
  }

export type EstudanteDataCreateREceived = {
  nome: string,
  data_nascimento: Date,
  numero_processo? : number,
  turma_id: string,
  foto : Express.Multer.File
  createdAt? : Date
  updatedAt? : Date
  contatos: string,
  naturalidade: string
  enderecos: string
}

export type EstudanteDataUpdate = {
  id: string
  nome: string,
  data_nascimento: Date,
  numero_processo? : number,
  turma_id: string,
  contatos:ContatoDate[],
  naturalidade: NaturalidadeDate,
  enderecos:EnderecoDate[]
}
export type ContatoDate = {
  id:string
  nome?: string,
  valor?: string,
  // estudante_id : string,
}

export type NaturalidadeDate = {
  id:string
  naturalidade?: string,
  municipio_id?: string,
}
export type EnderecoDate = {
  id?:string
  municipio_id?: string,
  distrito?: string,
  rua?: string,
  ponto_de_referencia?: string
}

export type ImageData ={
  id?: string
  path : string
}

export type ResponseData ={
    estudantes : EstudanteDataCreate[]
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

export default interface EstudanteRepository {
    add:(data : EstudanteDataCreate) => Promise<EstudanteDataCreate>
    update:(data:Partial<EstudanteDataUpdate>) => Promise<EstudanteDataCreate>
    get:(searchParams : Partial<SearchParamsData>) => Promise<ResponseData>
    find :(aluno_id:string) => Promise<EstudanteDataCreate>
    delete:(aluno_id : string ) => Promise<AlunoData>
}