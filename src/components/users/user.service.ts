import UserModel, { IUserDoc } from './user.model';
import { ConflictError } from '../../middleware/errorHandler';

/**
 * Attempt to find a user with the provided username (case insensitive)
 * @param username Username to search for
 * @returns The user document for the user with the given username if exists, otherwise null
 */
export const getUserByUsername = async (username: string): Promise<IUserDoc | null> => {
    return UserModel.findOne<IUserDoc>({ username }).collation({
        locale: 'en',
        strength: 2,
    });
};

/**
 * Attempt to find a user with the provided email (case insensitive)
 * @param email Email to search for
 * @returns The user document for the user with the given email if exists, otherwise null
 */
export const getUserByEmail = async (email: string): Promise<IUserDoc | null> => {
    return UserModel.findOne<IUserDoc>({ email }).collation({
        locale: 'en',
        strength: 2,
    });
};

/**
 * Create a new user with the given information.
 * @param username
 * @param email
 * @param password
 */
export const createUser = async (username: string, email: string, password: string) => {
    if (await getUserByEmail(email)) {
        throw new ConflictError('email', 'This email is already taken');
    } else if (await getUserByUsername(username)) {
        throw new ConflictError('username', 'This username is already taken');
    }

    await UserModel.create({
        username,
        email,
        password,
    });
};
