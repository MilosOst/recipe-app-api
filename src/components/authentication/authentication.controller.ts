import { NextFunction, Request, Response } from 'express';
import { createUser } from '../users/user.service';
import { LoginUserInput, RegisterUserInput } from './authentication.schema';
import { loginUser } from './authentication.service';

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

export const loginUserHandler = async (
    req: Request<unknown, unknown, LoginUserInput['body']>,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = await loginUser(req.body.usernameOrEmail, req.body.password);
        return res.status(200).json({ token: `Bearer ${token}` });
    } catch (err) {
        return next(err);
    }
};
