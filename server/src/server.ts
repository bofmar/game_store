// Libraries
import express from 'express';
import path from 'path';
import url from 'url';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import Game from './models/game.js';

// Middleware
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';


dotenv.config();

const PORT = process.env.PORT || 5000;
const IS_DEV = process.env.DEV;
const MONGOURI = IS_DEV ? process.env.MONGO_TEST_URI : process.env.MONGO_PROD_URI;
const runningMessage = `Listening for requests on port ${PORT}`; 
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

mongoose.connect(MONGOURI as string).then(_result => {
	app.listen(PORT, () => console.log(runningMessage, `MONGOURI: ${MONGOURI}`, `filename: ${__filename}`, `dirname: ${__dirname}`));
}).catch(error => {
	console.log(error);
});

// middleware
app.use(helmet());
app.use(cors());
app.use(morgan(IS_DEV ? 'dev' : 'common'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Say hi
app.get('/', async (_req: express.Request, res: express.Response) => {
	const game = await Game.findOne({ title: 'Test game 1' }).populate('genres').populate('publisher').populate('consoles').exec();
	console.log(game?.url);
	console.log(game?.genres);
	console.log(game?.publisher);
	console.log(game?.consoles);
	res.json(game);
});

app.use((_req: express.Request, res: express.Response): void => {
	res.status(404).send('404 - Page not found');
});
