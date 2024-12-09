import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

export class RequestValidationError extends CustomError {
    statusCode = 400;

    constructor(public errors: ValidationError[]){
        super("Invalid request parameters");
        
        // Only because we are extending a built in a class
        (<any>Object).setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeError() {
        console.log("request-validation-error.ts serializeError ...");
        return this.errors.map((err) => {
          if (err.type === 'field') {
            return { message: err.msg, field: err.path };
          }
          return { message: err.msg };
        });
      }
}