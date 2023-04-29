import { object, string, TypeOf } from 'zod';

export const registerUserSchema = object({
    body: object({
        username: string({
            required_error: 'A username must be provided.',
        })
            .min(4, 'Username must be between 4 and 16 alphanumeric characters.')
            .max(16, 'Username must be between 4 and 16 alphanumeric characters.')
            .regex(/^\w+$/, 'Username must consist of alphanumerics characters only'),
        email: string({
            required_error: 'An email must be provided',
        }).email('Invalid email.'),
        password: string({
            required_error: 'A password must be provided',
        })
            .min(6, 'Password must be at least 6 characters long.')
            .regex(/[0-9]/, 'Password must contain a number')
            .regex(/[A-Z]/, 'Password must contain an uppercase letter'),
        passwordConfirmation: string({
            required_error: 'Password must be confirmed',
        }),
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: 'Passwords do not match',
        path: ['passwordConfirmation'],
    }),
});

export const loginUserSchema = object({
    body: object({
        usernameOrEmail: string({
            required_error: 'You must provide your email/password.',
        }),
        password: string({
            required_error: 'You must provide your password.',
        }),
    }),
});

export type RegisterUserInput = TypeOf<typeof registerUserSchema>;
export type LoginUserInput = TypeOf<typeof loginUserSchema>;
