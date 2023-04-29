import express from 'express';
import { registerUserSchema } from './authentication.schema';
import validateInput from '../middleware/validateInput';
import { registerUserHandler } from './authentication.controller';

const authRouter = express.Router();

authRouter.post('/register', validateInput(registerUserSchema), registerUserHandler);

export default authRouter;
