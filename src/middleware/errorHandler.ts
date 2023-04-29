/* eslint-disable max-classes-per-file */
import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger';

export abstract class APIError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}

export class ConflictError extends APIError {
    param: string;

    constructor(param: string, message: string) {
        super(message, 409);
        this.param = param;
    }
}

export class UnauthorizedError extends APIError {
    constructor(message: string) {
        super(message, 401);
    }
}

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    logger.error(err);
    let statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    if (err instanceof ConflictError) {
        return res.status(409).json({
            errors: [{ message: err.message, param: err.param }],
        });
    }

    if (err instanceof APIError) {
        statusCode = err.statusCode;
    }

    res.status(statusCode);
    const message = err instanceof APIError ? err.message : 'Something went wrong';
    return res.json({
        message,
    });
}
