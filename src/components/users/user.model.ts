import bcrypt from 'bcrypt';
import mongoose, { Document, LeanDocument } from 'mongoose';

export interface IUser {
    username: string;
    email: string;
    bio: string;
    password: string;
    profilePicURL?: string;
    recipeCount: number;
    followerCount: number;
    followingCount: number;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>(
    {
        username: {
            type: String,
            minLength: 4,
            maxLength: 16,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            minLength: 3,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            minLength: 6,
            required: true,
            select: false,
        },
        bio: {
            type: String,
            maxLength: 150,
            default: '',
        },
        profilePicURL: String,
        recipeCount: { type: Number, min: 0, default: 0 },
        followerCount: { type: Number, min: 0, default: 0 },
        followingCount: { type: Number, min: 0, default: 0 },
    },
    {
        timestamps: true,
    }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    this.password = await bcrypt.hash(this.password, 10);
    return next();
});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password).catch(() => false);
};

export interface IUserDoc extends IUser, Document {}

export type IUserDocLean = LeanDocument<IUserDoc>;

export default mongoose.model<IUser>('User', userSchema);
