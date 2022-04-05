import express, { NextFunction, Request, Response } from 'express';

import { getMx5Data } from '../lib/Store';


const router = express.Router();

router.get('/all', async (req: Request, mainres: Response, next: NextFunction) => {
    getMx5Data((err, res) => {
        mainres.json(res);
    })
});

export default router;
