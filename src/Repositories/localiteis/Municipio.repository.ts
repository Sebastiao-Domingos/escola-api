import { DeleteSms, PaisData } from "./Pais.repository";
import { ProvinciaData } from "./Provincia.repository";

export type MunicipioCreateData={
    id? : string
    nome : string
    provincia_id: string
}

export type MunicipioData = {
    id : string
    nome : string
    provincia_id :string
    createdAt? : Date
    updaatedAt? :Date
    provincia? : ProvinciaData  
}

export type SearchParamsDataMunicipio = {
    perPage : number
    currentPage : number
    pais_id : string,
    nome_pais:string,
    provincia_id : string ,
    nome_provincia : string
}

export type ResponseDataMunicipio ={
    municipios : MunicipioData[]
    perPage : number
    previousPage : number | null
    currentPage : number,
    nextPage : number | null
    lastPage : number | null
    total : number
}

export default interface MunicipioRepository {
    add : (data : MunicipioCreateData) => Promise<MunicipioData>;
    update : (data : Partial<MunicipioCreateData>) => Promise<MunicipioData>;
    get : (searchParams : SearchParamsDataMunicipio) => Promise<ResponseDataMunicipio>,
    find : ( provincia_id : string ) => Promise<MunicipioData>
    delete : ( provincia_id : string ) => Promise<DeleteSms | Error>
}