import express from 'express';
import { requireAuth } from '../../middleware/requireAuth';
import validateInput from '../../middleware/validateInput';
import upload from '../../utils/multerSetup';
import {
    handleRecipeCoverPhotoUpload,
    handleRecipeCreation,
    handleRecipeSearch,
} from './recipe.controller';
import { createRecipeSchema, recipeSearchSchema } from './recipe.schema';

const recipeRouter = express.Router();

recipeRouter.use(requireAuth);

// Route used to upload cover photo independently for recipe
recipeRouter.post('/image', upload.single('image'), handleRecipeCoverPhotoUpload);

recipeRouter.post('/', validateInput(createRecipeSchema), handleRecipeCreation);

recipeRouter.get('/', validateInput(recipeSearchSchema), handleRecipeSearch);

export default recipeRouter;
