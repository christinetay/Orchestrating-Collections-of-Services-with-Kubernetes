import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

export class DatabaseValidatorError extends CustomError{
    statusCode = 500;
    reason = "Error connecting to database";

    constructor(public errors: ValidationError[]){
        super("Error connecting to database");

        console.log("database-validation-error.ts get in...");
        (<any>Object).setPrototypeOf(this, DatabaseValidatorError.prototype);
    }

    serializeError(){
        return [{ message: this.reason }];
    }

    
}