import express from 'express';

const router = express.Router();
router.post('/api/users/signout', ( req: any, res: any )=>{

    req.session = null;
    res.send({});
    //res.send('Hi there! This is signout POST API...');
});

export { router as signoutRouter };
