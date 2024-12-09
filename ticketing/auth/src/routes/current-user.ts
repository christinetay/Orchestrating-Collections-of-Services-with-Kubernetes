import express from 'express';
import jwt from 'jsonwebtoken';
import { currentUser } from '../middleware/current-user';
import { requireAuth } from '../middleware/require-auth';

const router = express.Router();
router.get('/api/users/currentuser', currentUser, requireAuth, (req: any, res: any) => {
    console.log("current-user.ts 2 start...");

    req.send({ currentUser: req.currentUser || null });
    // if(!req.session || !req.session.jwt) {
    //     return res.send({ currentUser: null });
    // }

    // try {
    //     const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
    //     res.send({ currentUser: payload })
    // }
    // catch(err) {
    //     res.send({ currentUser: null });
    // }

    
    //res.send('Hi there! This is currentUser GET API...')
});

export { router as currentUserRouter };