import express from 'express';
import { requireAuth } from '../../middleware/requireAuth';
import { getMeHandler } from './personal.controller';

const personalRouter = express.Router();

personalRouter.use(requireAuth);

personalRouter.get('/', getMeHandler);

export default personalRouter;
