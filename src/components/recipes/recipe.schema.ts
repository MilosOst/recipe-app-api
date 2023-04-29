import * as z from 'zod';
import { IngredientUnitTypes, RecipeCategories } from './recipe.model';

export const createRecipeSchema = z.object({
    body: z.object({
        name: z
            .string({
                required_error: 'You must provide a name for this recipe',
            })
            .trim()
            .nonempty('Recipe name must not be empty'),
        coverPhoto: z.string({
            required_error: 'You must provide an image of your recipe.',
        }),
        categories: z.array(z.enum(RecipeCategories)),
        minutesToMake: z.coerce
            .number({
                required_error: 'You must provide how long it takes to make this recipe.',
            })
            .int()
            .min(1, 'The time to make must be between 1 minute and 2880 minutes.')
            .max(2880, 'The time to make must be between 1 minute and 2880 minutes.'),
        steps: z.array(z.string().max(2400, 'Step exceeds 2400 character limit.')),
        // ingredients: z.array(z.string().max(64, 'Ingredient name exceeds 64 character limit.')),
        ingredients: z
            .object({
                name: z.string().max(48, 'Ingredient names exceeds 48 character limit.'),
                quantity: z.number().min(0, 'Quantity must be greater than 0.'),
                unit: z.enum(IngredientUnitTypes),
            })
            .array(),
        description: z.string().max(8000, 'Description exceeds 8000 character limit.'),
    }),
});

export type CreateRecipeInput = z.TypeOf<typeof createRecipeSchema>;
