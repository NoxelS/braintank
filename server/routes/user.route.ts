import express, { NextFunction, Request, Response } from 'express';

import { getUserJsons, mainPool, storeUserJson } from '../lib/Store';


const router = express.Router();

router.get('/', async (req: Request, mainres: Response, next: NextFunction) => {
    if ((req as any).oidc.user) {
        try {
            getUserJsons((err, res) => {
                console.log((req as any).oidc.user);
                if (err) {
                    next(err);
                } else {
                    const users = res.map((r: any) => JSON.parse(r.json));
                    console.log(users);
                    if (users && !users.find((user: any) => user.picture == (req as any).oidc.user.picture)) {
                        storeUserJson(mainPool, JSON.stringify((req as any).oidc.user), (err, res) => {
                            console.log(users);
                            mainres.json((req as any).oidc.user);
                        });
                    } else {
                        mainres.json((req as any).oidc.user);
                    }
                }
            });
        } catch (err) {
            next(err);
        }
    } else {
        mainres.json([]);
    }
});

router.get('/all', async (req: Request, mainres: Response, next: NextFunction) => {
    if ((req as any).oidc.user) {
        try {
            getUserJsons((err, res) => {
                if (res && !err) {
                    const users = res.map((r: any) => JSON.parse(r.json));
                    mainres.json(users);
                } else {
                    console.log(err);
                    const users = [];
                }
            });
        } catch (err) {
            next(err);
        }
    } else {
        mainres.json([]);
    }
});

export default router;
