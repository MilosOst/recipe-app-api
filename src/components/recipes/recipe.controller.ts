import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from '../../middleware/errorHandler';
import { uploadS3Image } from '../../utils/amazonS3';
import coverPhotoModel from './coverPhoto.model';
import { CreateRecipeInput, SearchRecipeInput } from './recipe.schema';
import { createRecipe, searchRecipes } from './recipe.service';

export const handleRecipeCoverPhotoUpload = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!req.file) {
            return next(new BadRequestError('image', 'An image must be provided'));
        }

        const MAX_FILE_SIZE = 5_000_000;
        const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

        if (!ACCEPTED_IMAGE_TYPES.includes(req.file.mimetype)) {
            return next(
                new BadRequestError('image', 'Only .jpg, .jpeg and .png formats are supported')
            );
        }

        if (req.file.size > MAX_FILE_SIZE) {
            return next(new BadRequestError('image', 'Max image size is 5MB'));
        }

        const imageName = await uploadS3Image(req.file);

        await coverPhotoModel.create({
            user: req.user.id,
            imageName,
        });

        return res.status(200).json(imageName);
    } catch (err) {
        return next(err);
    }
};

export const handleRecipeCreation = async (
    req: Request<unknown, unknown, CreateRecipeInput['body']>,
    res: Response,
    next: NextFunction
) => {
    try {
        await createRecipe(req.user.id, req.body);
        return res.status(201).json({ message: 'Recipe successfully posted.' });
    } catch (err) {
        return next(err);
    }
};

export const handleRecipeSearch = async (
    req: Request<unknown, unknown, unknown, SearchRecipeInput['query']>,
    res: Response,
    next: NextFunction
) => {
    try {
        return res.status(200).json(await searchRecipes(req.user.id, req.query));
    } catch (err) {
        return next(err);
    }
};
