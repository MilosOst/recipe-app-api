import dotenv from 'dotenv';
import { Application } from 'express';
import connect from './utils/connect';
import logger from './utils/logger';
import createServer from './utils/server';

dotenv.config();

const app: Application = createServer();
const port = process.env.PORT || '3000';

app.listen(3000, '192.168.50.75', async () => {
    logger.info(`Server listening at http://localhost:${port}`);
    await connect();
});

export default app;
