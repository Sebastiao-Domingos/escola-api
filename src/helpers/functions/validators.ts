import { validate } from "uuid";
import { EnderecoDate, ContatoDate } from "../../Repositories/users/Estudante.repository";
import { PrismaClient } from "@prisma/client";

const prisma = new  PrismaClient();

export function validateEndereco( 
    endereco : { municipio_id: string,
                distrito: string,
                rua: string,
                ponto_de_referencia: string}[]
){
    return endereco.every( ender => validate(ender.municipio_id))
}


export function validateEnderecoMunicipio(  datas : EnderecoDate[]){
    return datas.every( async (ender) => {
        const find = await prisma.municipio.findUnique( { where : { id : ender.municipio_id  }}).then( res => res);
        return find !==null
    })
}
export function validateContato(  datas : ContatoDate[]){

    return datas.every( async (ender) => {
        const find = await prisma.municipio.findUnique( { where : { id : ender.id  }}).then( res => res);
        return find !==null
    })
}