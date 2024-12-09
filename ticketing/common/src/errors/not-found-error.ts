import { CustomError } from "./custom-error";
import { ValidationError } from "express-validator";

export class NotFoundError extends CustomError{
    statusCode = 404;
    reason = "Page Not Found";

    constructor(){
        super("Page Not Found");

        (<any>Object).setPrototypeOf(this, NotFoundError.prototype);
    }

    serializeError(){
        return [{message: this.reason}]
    }

}