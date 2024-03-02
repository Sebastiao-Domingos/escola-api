
export class ApiError extends Error {
    public readonly statusCode : number;
    public readonly messageError : string;

    constructor(message : string , statusCode : number){
        super(message),
        this.statusCode = statusCode,
        this.messageError = message
    }
}

export class BadRequestError extends ApiError {
    constructor(message : string){
        super(message, 400)
    }
}

export class NotfoundError extends ApiError{
    constructor( message : string){
        super(message ,404)
    }
}

export class UnauthorizedError extends ApiError {
    constructor( message : string){
        super(message ,401);
    }
}