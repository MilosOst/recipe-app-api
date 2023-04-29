import express from 'express';
import { requireAuth } from '../../middleware/requireAuth';
import validateInput from '../../middleware/validateInput';
import upload from '../../utils/multerSetup';
import { handleRecipeCoverPhotoUpload, handleRecipeCreation } from './recipe.controller';
import { createRecipeSchema } from './recipe.schema';

const recipeRouter = express.Router();

recipeRouter.use(requireAuth);

// Route used to upload cover photo independently for recipe
recipeRouter.post('/image', upload.single('image'), handleRecipeCoverPhotoUpload);

recipeRouter.post('/', validateInput(createRecipeSchema), handleRecipeCreation);

export default recipeRouter;
