import { Request, Response } from "express";
import { EstudanteService } from "../../services/users/Aluno.service";
import { AlunoData, SearchParamsData } from "../../Repositories/users/Estudante.repository";
//import { validate } from "uuid";

const service = new EstudanteService();

export class AlunoController{

    /**
     * create
     */
    public async create( request : Request, response : Response) {
        const data : AlunoData = request.body;

        return await service.add(data)
        .then( res => {
            return response.status(200).json(res)
        })
        .catch( error => {
            response.status(401).json({sms : "erro!" , error : error})
        })
    }
        /**
     * create
     */
    public async update( request : Request, response : Response) {
        const aluno_id : string = request.params.id;
        const data : Partial<AlunoData> = request.body;
        data.id = aluno_id;
        return await service.update(data)
        .then( res => {
            return response.status(200).json(res)
        })
        .catch( error => {
            response.status(401).json({sms : "erro!" , error : error})
        })
    }

    /**
     * get
     */
    public async get( request : Request , response : Response) {
        const searchParams : Partial<SearchParamsData> = request.query;
        return await service.get( searchParams )
        .then( res => {
            response.status(200).json(res)
        })
        .catch(error => {
            response.status(400).json({sms : "Erro" , error : error})
        })
    }

    /**
     * find
     */
    public async find( request :Request , response : Response) {
        const aluno_id : string = request.params.id;

        return await service.find(aluno_id)
        .then( resp => {
            return response.status(200).json(resp)
        })
        .catch( error => {
            return response.status(400).json(error)
        })
    }

    /**
     * delete
     */
    public async delete( request : Request , response :Response) {
        const aluno_id :string = request.params.id;
        
        return await service.delete(aluno_id)
        .then( res => {
            response.status(200).json(res);
        })
        .catch( error => {
            response.status(400).json(error)
        })
    }
}