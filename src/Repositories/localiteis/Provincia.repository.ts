import { PaisData } from "./Pais.repository";

export type ProvinciaCreateData={
    id? : string
    nome : string
    pais_id: string
}

export type ProvinciaData = {
    id : string
    nome : string
    pais_id :string
    createdAt? : Date
    updaatedAt? :Date
    pais? : PaisData
    municipios? : {
        id : string
        nome : string
        createdAt? : Date
        updaatedAt? :Date
    }[]  
}

export type ResponseDataProvincia ={
    provincias: ProvinciaData[]
    perPage : number
    previousPage : number | null
    currentPage : number,
    nextPage : number | null
    lastPage : number | null
    total : number
}

export type SearchParamsDataProvincia = {
    perPage : number
    currentPage : number
    pais_id : string 
}


export type DeleteSms = {
    sms : string
}

export default interface ProvinciaRepository {
    add : (data : ProvinciaCreateData) => Promise<ProvinciaData>;
    update : (data : Partial<ProvinciaCreateData>) => Promise<ProvinciaData>;
    get : (searchParams : SearchParamsDataProvincia) => Promise<ResponseDataProvincia>,
    find : ( provincia_id : string ) => Promise<ProvinciaData>
    delete : ( provincia_id : string ) => Promise<DeleteSms | Error>
}