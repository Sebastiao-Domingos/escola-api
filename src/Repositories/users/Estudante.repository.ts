

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
    numero_processo? : number,
    turma_id: string,
    createdAt? : Date
    updatedAt? : Date
    contatos: [
      {
        nome: string,
        valor: string,
        createdAt? : Date
        updatedAt? : Date
      }
    ],
    naturalidade: {
      naturalidade: string,
      municipio_id: string,
      createdAt? : Date
      updatedAt? : Date
    },
    enderecos: [
      {
        municipio_id: string,
        distrito: string,
        rua: string,
        ponto_de_referencia: string,
        createdAt? : Date
        updatedAt? : Date
      }
    ]
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
    // update:(data:Partial<EstudanteDataCreate>) => Promise<EstudanteDataCreate>
    get:(searchParams : Partial<SearchParamsData>) => Promise<ResponseData>
    find :(aluno_id:string) => Promise<EstudanteDataCreate>
    delete:(aluno_id : string ) => Promise<AlunoData>
}