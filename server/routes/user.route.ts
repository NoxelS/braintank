import express, { NextFunction, Request, Response } from 'express';

import { getUserJsons, mainPool, storeUserJson } from '../lib/Store';


const router = express.Router();

router.get('/', async (req: Request, mainres: Response, next: NextFunction) => {
    try {
        getUserJsons((err, res) => {
            const users = res.map((r: any) => JSON.parse(r.json));
            if (!users.find((user: any) => user.nickname == (req as any).oidc.user.nickname)) {
                storeUserJson(mainPool, JSON.stringify((req as any).oidc.user), (err, res) => {
                    console.log(users);
                    mainres.json((req as any).oidc.user);
                });
            } else {
                mainres.json((req as any).oidc.user);
            }
        });
    } catch (err) {
        next(err);
    }
});

router.get('/all', async (req: Request, mainres: Response, next: NextFunction) => {
    try {
        getUserJsons((err, res) => {
            const users = res.map((r: any) => JSON.parse(r.json));
            mainres.json(users);
        });
    } catch (err) {
        next(err);
    }
});

export default router;
