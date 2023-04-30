import { BadRequestError } from '../../middleware/errorHandler';
import { getImage } from '../../utils/amazonS3';
import UserModel, { IUserDocLean } from '../users/user.model';
import CoverPhotoModel, { ICoverPhotoDocLean } from './coverPhoto.model';
import RecipeModel, { IRecipeDocLean } from './recipe.model';
import { CreateRecipeInput, SearchRecipeInput } from './recipe.schema';

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

export const searchRecipes = async (userId: string, input: SearchRecipeInput['query']) => {
    if (!input.category && !input.name) {
        throw new BadRequestError('name', 'You must provide either a name or a category.');
    }

    const query = {
        ...(input.name ? { name: { $regex: new RegExp(input.name, 'i') } } : {}),
        ...(input.category ? { categories: input.category } : {}),
        id: { $ne: userId },
    };

    const results = await RecipeModel.find<IRecipeDocLean>(query)
        .limit(15)
        .populate<{ user: IUserDocLean }>({ path: 'user', select: 'username' })
        .select('-raters')
        .lean();

    return Promise.all(
        results.map(async (result) => ({
            ...result,
            coverPhoto: await getImage(result.coverPhoto),
        }))
    );
};
