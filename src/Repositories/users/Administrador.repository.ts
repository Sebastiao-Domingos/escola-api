import { Multer } from "multer"
import { DeleteSms } from "../localiteis/Pais.repository"
import { NotaCreateData } from "../school/classroom/Nota.repository"
import { Disciplina } from "@prisma/client"
import { ContatoDate, NaturalidadeDate, EnderecoDate } from "./Estudante.repository"


export type AdministradorData = {
    id? : string 
    nome :string
    senha : string
    data_nascimento : Date,
    createdAt? : Date
    updatedAt? : Date
}

export type AdministradorDataCreate = {
    id ?: string
    nome :string
    senha : string
    data_nascimento : Date,
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

export type AdministradorDataCreateReceived = {
  senha : string  
  nome: string,
  data_nascimento: Date,
  foto : Express.Multer.File
  contatos: string,
  naturalidade: string
  enderecos: string
}

export type AdministradorDataUpdate = {
  id: string
  nome: string,
  data_nascimento: Date,
  senha : string
  contatos:ContatoDate[],
  naturalidade: NaturalidadeDate,
  enderecos:EnderecoDate[]
}

export type ResponseDataAdmin ={
    estudantes : AdministradorDataCreate[]
    perPage : number
    previousPage : number | null
    currentPage : number,
    nextPage : number | null
    lastPage : number | null
    total : number
}

export type  SearchAdministrador = {
    currentPage : number;
    peerPage : number;
}

export default interface AdministradorRepository {
    add:(data : AdministradorDataCreate) => Promise<AdministradorDataCreate>
    update:(data:Partial<AdministradorDataUpdate>) => Promise<AdministradorDataCreate>
    get:(params : Partial<SearchAdministrador>) => Promise<ResponseDataAdmin>
    find :(admin_id:string) => Promise<AdministradorDataCreate>
    delete:(admin_id : string ) => Promise<DeleteSms>
}