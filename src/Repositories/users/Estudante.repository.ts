

export type AlunoData = {
    id : string 
    nome :string
    numero_processo? : number,
    data_nascimento : Date,
    turma_id : string
    createdAt? : Date
    updatedAt? : Date
}

export type ResponseData ={
    alunos : AlunoData[]
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
    turma :string
    id_municipio: string
    distrito : string
    rua :string 
}

export default interface AlunoRepository {
    add:(data : AlunoData) => Promise<AlunoData>
    update:(data:Partial<AlunoData>) => Promise<AlunoData>
    get:(searchParams : Partial<SearchParamsData>) => Promise<ResponseData>
    find :(aluno_id:string) => Promise<AlunoData>
    delete:(aluno_id : string ) => Promise<AlunoData>
}