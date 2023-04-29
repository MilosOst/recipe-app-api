import jwt, { Secret } from 'jsonwebtoken';

/**
 * Sign a jsonwebtoken with the provided information
 * @param username Username
 * @param email Email
 * @param id User's id
 * @returns The signed jsonwebtoken
 */
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

/**
 * Verify the provided jsonwebtoken.
 * @param token Token to verify
 * @returns User's decoded information
 */
export const verifyJWT = (token: string): { username: string; email: string; id: string } => {
    const decoded = jwt.verify(token, process.env.SECRET_KEY as Secret);
    type DecodedJWT = { username: string; email: string; id: string };
    return decoded as DecodedJWT;
};
