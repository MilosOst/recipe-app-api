import mongoose from 'mongoose';
import logger from './logger';

async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI || '');
        logger.info('Connected to db');
    } catch (err) {
        logger.info('Failed to connect to MongoDB');
        process.exit(1);
    }
}

export default connect;
