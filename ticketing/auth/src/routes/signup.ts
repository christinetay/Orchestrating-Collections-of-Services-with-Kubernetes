import express from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
import { validateRequest } from '../middleware/validate-request';

const router = express.Router();
router.post('/api/users/signup',
[
    body('email')
        .isEmail()
        .withMessage('Émail must be valid.'),
    body('password')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage('Password must be between 4 and 20 characters.')
]
,validateRequest
,async(req: any, res: any, next: any ) => {

    //check if user exists
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email }); 
    if(existingUser){
        console.log("Signup.ts - Bad Rquest Error [Existing user found] ...");
        throw new BadRequestError("Email in use");  
        //next(new BadRequestError("Email in use"));
    }
        
    //add user by build and save user
    const user = User.build({ email, password });
    await user.save();

    // Generate JWT 
    const userJWT = jwt.sign({
        id: user.id,
        email: user.email
    }, process.env.JWT_KEY! );

    //Store it on session object
    req.session = {
        jwt: userJWT
    }

    console.log("signup.ts  process.env.JWT_KEY:",  process.env.JWT_KEY);
    console.log("signup.ts req:", req.session);

    // send back response with status 201 and its user details
    res.status(201).send(user);



    //-- Lesson (1) - Error Handling
    //res.send('Hi there! This is signup POST API...');]
    // const { email, password } = req.body;
    // if( !email || typeof email !== 'string'){
    //     res.status(400).send('Provide a valid email');
    // }

   
    // -- Lesson (2) - Error Handling
    // const errors = validationResult(req);
    // if(!errors.isEmpty()){
    //     console.log("Error ...");
    //     return res.status(400).send(errors.array());
    // }


    // // -- Lesson (3) - Error Handling
    // if(!errors.isEmpty()){
    //     console.log("Error ...");
    //     throw new Error('Invalid Email or Password');
    // }
    // throw new Error('Error connecting to database');


    // // -- Lesson (4) - Error Handling 
    // // the action of throw will trigger errorHandler
    // // as errorHandler capture error
    // if(!errors.isEmpty()){
    //     console.log("Error ...");
    //     throw new RequestValidationError(errors.array());   
    // }
    // throw new DatabaseValidatorError(errors.array());
});

export { router as signupRouter };