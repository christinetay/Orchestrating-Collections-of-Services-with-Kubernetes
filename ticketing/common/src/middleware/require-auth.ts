import { Request, NextFunction, Response } from 'express';
import { NotAuthorisedError }  from '../errors/not-authorised-error';

export const requireAuth = 
(
    req: any,
    res: any,
    next: NextFunction
) => 
{
    console.log("middleware require-auth.ts start...");
    if(!req.currentUser) {
        //return res.status(401).send();
        console.log("not authorised error start...");
        throw new NotAuthorisedError();
    }

    next();
} 