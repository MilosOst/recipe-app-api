import { NextFunction, Request, Response } from 'express';
import { createUser } from '../users/user.service';
import { RegisterUserInput } from './authentication.schema';

export const registerUserHandler = async (
    req: Request<unknown, unknown, RegisterUserInput['body']>,
    res: Response,
    next: NextFunction
) => {
    try {
        await createUser(req.body.username, req.body.email, req.body.password);
        return res.status(201).json({ message: 'Successfully registered.' });
    } catch (err) {
        return next(err);
    }
};
