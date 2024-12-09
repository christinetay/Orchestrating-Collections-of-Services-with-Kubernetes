import { Request, Response, NextFunction } from 'express';
import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseValidatorError } from '../errors/database-validation-error';
import { CustomError } from '../errors/custom-error';

export const errorHandler = ( 
    err: Error, 
    req: Request,
    res: any,
    next: NextFunction   ) =>
{
    console.log("Middleware Error-Handler.ts: starting ...");
    console.log("Midlleware Error-Handler.ts: err - ", err);

    if(err instanceof CustomError){
        console.log("error-handler.ts customError get in ...");
        return res.status(err.statusCode).send({ errors: err.serializeError() });
    }

    return res.status(400).send("Something went wrong");

     // -- Lesson (5) - Error Handling
    // // -- Lesson (3.c) - Error Handling
    // // return res.status(400).send({message: err.message});

    // if(err instanceof RequestValidationError){
    //     console.log("Error-Handler.ts: Request validation error ...");

    //     //-- Lesson (4.c) - Error Handling 
    //     // const formattedErrors = err.errors.map(error=>{
    //     //     return{
    //     //         message: error.msg,
    //     //         field: error.type
    //     //     }
    //     // })

    //     // return res.status(400).send({ errors: formattedErrors })

    //     return res.status(err.statusCode).send(err.serializeError());        
    // }

    // if(err instanceof DatabaseValidatorError){
    //     console.log("Error-Handler.ts: Database validation error ...");

    //     //-- Lesson (4.d) - Error Handling 
    //     //return res.status(500).send({errors:err});

    //     return res.status(err.statusCode).send(err.serializeError());

    // } 

}