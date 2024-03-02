import { Administrador } from "@prisma/client";



export type LogInData = {
    id ?: string
    email? :string,
    senha? : string,
    nome ?: string
}

export type PayLoadType = {
    id : string,
    nome :string
}

export type LogInResponse = {
    id : string,
    nome : string,
    email : string,
    token : string;
}

export interface SessionRepository {
    logIn( data : LogInData) : LogInResponse;  
}