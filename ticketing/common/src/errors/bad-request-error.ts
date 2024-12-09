import { CustomError } from "./custom-error";

export class BadRequestError extends CustomError{
    statusCode = 404;

    constructor(public message: string){
        super(message);

        (<any>Object).setPrototypeOf(this, BadRequestError.prototype);
    }

    serializeError(){
        return [{message: this.message}]
    }

}