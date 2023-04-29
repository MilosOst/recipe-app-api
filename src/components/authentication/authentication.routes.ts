import express from 'express';
import { loginUserSchema, registerUserSchema } from './authentication.schema';
import validateInput from '../middleware/validateInput';
import { loginUserHandler, registerUserHandler } from './authentication.controller';

const authRouter = express.Router();

authRouter.post('/register', validateInput(registerUserSchema), registerUserHandler);

authRouter.post('/login', validateInput(loginUserSchema), loginUserHandler);

export default authRouter;
