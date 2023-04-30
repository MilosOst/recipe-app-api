/* eslint-disable @typescript-eslint/no-inferrable-types */
import {
    PutObjectCommand,
    PutObjectCommandInput,
    S3Client,
    GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import dotenv from 'dotenv';
import sharp from 'sharp';
import { Express } from 'express';
import { randomBytes } from 'crypto';

dotenv.config();

const bucket = process.env.BUCKET_NAME as string;
const bucketRegion = process.env.BUCKET_REGION as string;
const accessKeyId = process.env.S3_ACCESS_KEY as string;
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY as string;

const s3Client = new S3Client({
    region: bucketRegion,
    credentials: {
        accessKeyId,
        secretAccessKey,
    },
});

/**
 * Upload the provided image to Amazon S3.
 * @param image Image to be uploaded
 * @param height Height for image to be resized to
 * @param width Width for image to be resized to
 */
export const uploadS3Image = async (
    image: Express.Multer.File,
    height: number = 1350,
    width: number = 1080
): Promise<string> => {
    const buffer: Buffer = await sharp(image.buffer).rotate().resize({ height, width }).toBuffer();
    const imageName = randomBytes(32).toString('hex');
    const putParams: PutObjectCommandInput = {
        Bucket: bucket,
        Key: imageName,
        Body: buffer,
        ContentType: image.mimetype,
    };

    const putCommand = new PutObjectCommand(putParams);
    await s3Client.send(putCommand);

    return imageName;
};

export const getImage = async (imageName: string): Promise<string> => {
    try {
        const getObjectParams = {
            Bucket: bucket,
            Key: imageName,
        };

        const getCommand = new GetObjectCommand(getObjectParams);
        return getSignedUrl(s3Client, getCommand, { expiresIn: 7200 });
    } catch (e) {
        return '';
    }
};
