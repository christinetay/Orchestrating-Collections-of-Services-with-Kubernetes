import express from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middleware/validate-request';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
import { Password } from '../services/password';
import jwt from 'jsonwebtoken';

const router = express.Router();
router.post('/api/users/signin', 
[
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('You must supply a password')
]
,validateRequest
,async(req: any, res: any)=>{
    const { email, password } = req.body;
    
    //check if user exists
    const existingUser = await User.findOne({ email });
    if(!existingUser){
        throw new BadRequestError("Invalid credentials: Cannot found existing user");
    }

    //check if existingPassword is matched with password inserted
    const passwordsMatch = await Password.compare(
        existingUser.password,
        password
    )
    if(!passwordsMatch){
        throw new BadRequestError("Invalid credentials: Password not match");
    }

    // Generate JWT 
    const userJWT = jwt.sign({
        id: existingUser.id,
        email: existingUser.email
    }, process.env.JWT_KEY! );

    //Store it on session object
    req.session = {
        jwt: userJWT
    }

    console.log("signup.ts  process.env.JWT_KEY:",  process.env.JWT_KEY);
    console.log("signup.ts req:", req.session);

    // send back response with status 201 and its user details
    res.status(201).send(existingUser);



    // Lesson (1) - Validation Request
    // const errors = validationResult(req);

    // if(!errors.isEmpty()){
    //     throw new RequestValidationError(errors.array());
    // }

    

});

export { router as signinRouter };