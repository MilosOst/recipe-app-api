import { Response, Request, NextFunction } from 'express';
import { getMyInfo } from './personal.service';

export const getMeHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.status(200).json(await getMyInfo(req.user.id));
    } catch (err) {
        return next(err);
    }
};
