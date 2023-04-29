import mongoose, { HydratedDocument, Types, LeanDocument } from 'mongoose';
import { IUserDoc } from '../users/user.model';

interface IRecipe {
    user: mongoose.Schema.Types.ObjectId;
    name: string;
    coverPhoto: string;
    description: string;
    ingredients: { name: string; quantity: string };
    categories: string[];
    minutesToMake: number; // how long it takes to make this recipe
    steps: string[];
    ratingsTotal: number;
    ratingsCount: number;
    raters: Types.ObjectId[];
    datePosted: Date;
}

const recipeSchema = new mongoose.Schema<IRecipe>({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, minLength: 1, maxLength: 100, required: true },
    coverPhoto: { type: String, required: true },
    description: { type: String, maxLength: 8000 },
    ingredients: [
        {
            name: { type: String, maxLength: 48, required: true },
            quantity: {
                type: Number,
                min: 0,
                required: true,
            },
            unit: {
                type: String,
                required: true,
                enum: ['g', 'kg', 'oz', 'lb', 'mL', 'L', 'tbsp', 'tsp'],
            },
        },
    ],
    categories: [
        {
            type: String,
            enum: ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Soup', 'Salad', 'Appetizer'],
        },
    ],
    minutesToMake: { type: Number, min: 0, max: 2880, required: true },
    steps: [{ type: String, maxLength: 2400, required: true }],
    ratingsTotal: { type: Number, min: 0, default: 0 },
    ratingsCount: { type: Number, min: 0, default: 0 },
    raters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
    datePosted: { type: Date, default: Date.now, required: true },
});

export const RecipeCategories = [
    'Breakfast',
    'Lunch',
    'Dinner',
    'Dessert',
    'Soup',
    'Salad',
    'Appetizer',
] as const;

export const IngredientUnitTypes = ['g', 'kg', 'oz', 'lb', 'mL', 'L', 'tbsp', 'tsp'] as const;

export interface IRecipeDoc extends IRecipe, mongoose.Document {
    user: HydratedDocument<IUserDoc>['_id'];
}

export type IRecipeDocLean = LeanDocument<IRecipeDoc>;

export default mongoose.model<IRecipe>('Recipe', recipeSchema);
