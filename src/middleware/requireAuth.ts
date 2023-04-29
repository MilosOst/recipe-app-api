import { NextFunction, Request, Response } from 'express';
import { verifyJWT } from '../utils/jwtUtils';

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Invalid token provided.' });
    }

    try {
        req.user = verifyJWT(token);
        return next();
    } catch (err) {
        return res.status(401).json({ message: 'Failed to authenticate.' });
    }
};
