import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError, ZodIssue } from 'zod';

const validateInput =
    (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log(req.body.ingredients[0]);
            schema.parse({
                body: req.body,
                params: req.params,
                query: req.query,
            });
            return next();
        } catch (err) {
            if (err instanceof ZodError) {
                type validationError = { param: string; message: string };
                const mappedErrors: validationError[] = err.errors.map((e: ZodIssue) => ({
                    message: e.message as string,
                    param: e.path.slice(1).join('.') as string,
                }));

                return res.status(400).json({ errors: mappedErrors });
            }

            return res.status(400).json({ error: 'Bad Request.' });
        }
    };

export default validateInput;
