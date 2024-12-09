import { CustomError } from '../errors/custom-error';

export class NotAuthorisedError extends CustomError {
    statusCode = 401;

    constructor() {
        super('Not authorised');

        (<any>Object).setPrototypeOf(this, NotAuthorisedError.prototype);
    }

    serializeError(){
        return [{ message: 'Not authorised' }];
    }
}