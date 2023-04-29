import { Router } from 'express';
import authRouter from './components/authentication/authentication.routes';
import recipeRouter from './components/recipes/recipe.routes';

const indexRouter = Router();

indexRouter.use('/auth', authRouter);
indexRouter.use('/recipe', recipeRouter);

export default indexRouter;
