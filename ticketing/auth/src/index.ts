import express from 'express';
import 'express-async-errors';  //to solve throw issue in async statement
import { json } from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middleware/error-handler';
import { NotFoundError } from './errors/not-found-error';
import process = require('process');

const app = express();

// app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: true
    })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

// Help to solve the issue of (throw error) 
// in the async/await statement
// by 'express-asnyc-errors'
app.all('*', async (req: any, res: any, next: any) => {
    // -- Lesson (6) - Error Handling
    throw new NotFoundError();

    // -- Lesson (7) - Error Handling
    //next(new NotFoundError());
});


app.use(errorHandler);

const start = async () => {

    if(!process.env.JWT_KEY){
        throw new Error('JWT_KEY must be defined');
    }

    try{
        console.error("mongo start...");
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
        // await mongoose.connect('mongodb://leechoontay:Ng5xq3btJfGqkouY@cluster0.wvg00wb.mongodb.net/auth');
    }
    catch(err){
        console.error(err);
    }
}


// app.get('/api/users/currentuser', (req: any, res: any) => {
//     res.send('Hi there! 3rd updates');
// });

app.listen(3000,() =>{
    console.log('Listening on port 3000! ');
});

start();