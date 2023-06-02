import express from 'express';
import path from 'path';
import url from 'url';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGOURI = process.env.MONGOURI;
const runningMessage = `Listening for requests on port ${PORT}`; 
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

mongoose.connect(MONGOURI as string).then(_result => {
	app.listen(PORT, () => console.log(runningMessage, `MONGOURI: ${MONGOURI}`, `filename: ${__filename}`, `dirname: ${__dirname}`));
}).catch(error => {
	console.log(error);
});

app.use(cors());

// Say hi
app.get('/', (_req: express.Request, res: express.Response) => {
	res.json({ message: 'Hello from the backend' });
});

