import dotenv from 'dotenv';
import express, { Application } from 'express';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || '3000';

app.listen(port, async () => {
	console.log(`Server listening at http://localhost:${port}`);
});
