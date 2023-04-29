import express, { Application, Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import logger from './logger';

function createServer(): Application {
    const app = express();

    app.use((req: Request, res: Response, next: NextFunction) => {
        logger.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}]`);

        res.on('finish', () => {
            logger.info(
                `Incoming -> Method: [${req.method}] - Url: [${req.url}] - Status: [${res.statusCode}]]`
            );
        });

        next();
    });

    app.use(cors());
    app.use(helmet());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());

    return app;
}

export default createServer;
