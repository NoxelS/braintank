import express, { NextFunction, Request, Response } from 'express';




const router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json((req as any).oidc.user);
    } catch (err) {
        next(err);
    }
});

export default router;
