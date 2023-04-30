import { BadRequestError } from '../../middleware/errorHandler';
import UserModel from '../users/user.model';
import CoverPhotoModel, { ICoverPhotoDocLean } from './coverPhoto.model';
import RecipeModel from './recipe.model';
import { CreateRecipeInput } from './recipe.schema';

export const createRecipe = async (userId: string, input: CreateRecipeInput['body']) => {
    // Verify that cover photo matches the most recent one saved in database
    const coverPhotoDoc = await CoverPhotoModel.findOne<ICoverPhotoDocLean>({ user: userId })
        .sort({
            dateUploaded: -1,
        })
        .limit(1)
        .lean();

    if (coverPhotoDoc === null || coverPhotoDoc.imageName !== input.coverPhoto) {
        throw new BadRequestError('coverPhoto', 'Invalid cover photo provided');
    }

    await RecipeModel.create({
        user: userId,
        name: input.name,
        coverPhoto: coverPhotoDoc.imageName,
        description: input.description,
        ingredients: input.ingredients,
        steps: input.steps,
        minutesToMake: input.minutesToMake,
        categories: input.categories,
    });

    await UserModel.findByIdAndUpdate(userId, { $inc: { recipeCount: 1 } });
};
