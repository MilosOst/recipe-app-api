import { signJWT } from '../../utils/jwtUtils';
import { UnauthorizedError } from '../../middleware/errorHandler';
import UserModel, { IUserDoc } from '../users/user.model';

/**
 * Attempt to authenticate the user with the given credentials. If successful, the user's signed jsonwebtoken will be returned.
 * @param usernameOrEmail Username or email to identify user by
 * @param password User's passsword
 * @returns User's signed jsonwebtoken
 */
export const loginUser = async (usernameOrEmail: string, password: string): Promise<string> => {
    const user = await UserModel.findOne<IUserDoc>({
        $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    })
        .collation({
            locale: 'en',
            strength: 2,
        })
        .select('+password');

    if (!user || !(await user.comparePassword(password))) {
        throw new UnauthorizedError('Invalid login credentials.');
    }

    return signJWT(user.username, user.email, user.id);
};
