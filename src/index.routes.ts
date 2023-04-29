import { Router } from 'express';
import authRouter from './components/authentication/authentication.routes';

const indexRouter = Router();

indexRouter.use('/auth', authRouter);

export default indexRouter;
