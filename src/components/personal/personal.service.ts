import { IUserDoc, IUserDocLean } from '../users/user.model';
import UserModel from '../users/user.model';
import { UnauthorizedError } from '../../middleware/errorHandler';

export const getMyInfo = async (
    id: string
): Promise<Pick<IUserDoc, 'username' | 'email' | 'id'>> => {
    const user = await UserModel.findById<Pick<IUserDocLean, 'username' | 'email' | 'id'>>(
        id
    ).select('username email id');

    if (!user) throw new UnauthorizedError('Invalid token provided.');

    return user;
};
