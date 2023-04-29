import mongoose, { Document, LeanDocument, Schema } from 'mongoose';

/**
 * Collection used to store user's most recent uploaded image for review.
 */

interface ICoverPhoto {
    user: Schema.Types.ObjectId;
    imageName: string;
    dateUploaded: Date;
}

const coverPhotoSchema = new mongoose.Schema<ICoverPhoto>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    imageName: { type: String, required: true },
    dateUploaded: { type: Date, default: Date.now },
});

export interface ICoverPhotoDoc extends ICoverPhoto, Document {}

export type ICoverPhotoDocLean = LeanDocument<ICoverPhotoDoc>;

export default mongoose.model('CoverPhoto', coverPhotoSchema);
