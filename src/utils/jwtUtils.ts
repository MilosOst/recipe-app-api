import jwt, { Secret } from 'jsonwebtoken';

export const signJWT = (username: string, email: string, id: string) => {
    return jwt.sign(
        {
            username,
            email,
            id,
        },
        process.env.SECRET_KEY as Secret,
        { expiresIn: '2d' }
    );
};
