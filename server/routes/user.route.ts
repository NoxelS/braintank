import express, { NextFunction, Request, Response } from 'express';
import { requiresAuth } from 'express-openid-connect';

import { getUserJsons, mainPool, storeUserJson } from '../lib/Store';


const router = express.Router();

router.get('/', async (req: Request, mainres: Response, next: NextFunction) => {
    if ((req as any).oidc.user) {
        try {
            getUserJsons((err, res) => {
                if (err) {
                    next(err);
                } else {
                    const users = res.map((r: any) => JSON.parse(r.json));
                    if (users && !users.find((user: any) => user.picture == (req as any).oidc.user.picture)) {
                        storeUserJson(mainPool, JSON.stringify((req as any).oidc.user), (err, res) => {
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
        mainres.json(undefined);
    }
});

router.get('/all', requiresAuth(), async (req: Request, mainres: Response, next: NextFunction) => {
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
