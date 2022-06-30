import { NextFunction, Request, Response } from 'express';
import { AuthPayload } from '../types/auth';
import checkJWT from '../utils/checkJWT';

const authCheck = (
    req: Request<{ auth: AuthPayload }>,
    res: Response,
    next: NextFunction,
): void => {
    const token = req.headers.authorization;
    try {
        const auth = checkJWT(token);
        if (auth) {
            req.params.auth = auth;
            next();
        } else {
            res.status(401).json({ message: 'Invalid token' });
        }
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

export default authCheck;
