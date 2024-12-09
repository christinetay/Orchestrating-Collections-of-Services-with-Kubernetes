import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface UserPayload {
    id: string;
    email: string;
}

declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload;
        }
    }
}

export const currentUser = (
    req: any,
    res: any,
    next: NextFunction
) => {
    console.log("middleware current-user.ts start...");

    //test
        // Generate JWT 
        const userJWT = jwt.sign({
            id: '12345',
            email: "test@gmail.com"
        }, process.env.JWT_KEY! );

        //Store it on session object
        req.session = {
            jwt: userJWT
        }
    //end test

    if(!req.session || !req.session.jwt) {
        return res.send({ currentUser: 111 });
    }
    
    try {
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload | undefined;
        req.currentUser = payload;
        console.log("middleware current-user.ts req.currentUser:", req.currentUser);
        //res.send({ currentUser: payload })
    }
    catch(err) {
        res.send({ currentUser: 222 });
    }


    next();
}