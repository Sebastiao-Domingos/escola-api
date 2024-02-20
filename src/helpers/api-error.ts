
export class ApiError extends Error{
    public readonly message : string;
    public readonly status : number;

    constructor( message : string , status : number){
        super(message),
        this.message = message,
        this.status = status
    }
};


export class BadRequestError extends ApiError {
    constructor( message : string){
        super(message , 400)
    }
}

export class NotfoundError extends ApiError {
    constructor(message : string){
        super(message ,404)
    }
}

export class UnauthorizedError extends ApiError {
    constructor( message : string){
        super(message , 401)
    }
}
