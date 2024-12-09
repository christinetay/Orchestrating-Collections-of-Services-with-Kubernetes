import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';

// cannot include error, 
// otherwise system will treat it as error handler
export const validateRequest = (
    req: Request,
    res: Response,
    next: NextFunction ) =>
{
    console.log("Middleware Validate-request.ts: starting ...");

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        throw new RequestValidationError(errors.array());
    }

    next();
}