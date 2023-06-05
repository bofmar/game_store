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
// Routes
import catalogRouter from './routes/catalog.js';
dotenv.config();
const PORT = process.env.PORT || 5000;
const IS_DEV = process.env.DEV;
const MONGOURI = IS_DEV ? process.env.MONGO_TEST_URI : process.env.MONGO_PROD_URI;
const runningMessage = `Listening for requests on port ${PORT}`;
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..');
const app = express();
mongoose.connect(MONGOURI).then(_result => {
    app.listen(PORT, () => console.log(runningMessage, `MONGOURI: ${MONGOURI}`, `filename: ${__filename}`, `dirname: ${__dirname}`));
}).catch(error => {
    console.log(error);
});
// middleware
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cors());
app.use(morgan(IS_DEV ? 'dev' : 'common'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/images', express.static(path.join(ROOT, 'public/images')));
app.use('/catalog', catalogRouter);
// Say hi
app.get('/', async (_req, res) => {
    const game = await Game.findOne({ title: 'Test game 1' }).populate('genres').populate('publisher').populate('consoles').exec();
    console.log(game?.url);
    console.log(game?.genres);
    console.log(game?.publisher);
    console.log(game?.consoles);
    res.json(game);
});
app.use((_req, res) => {
    res.status(404).send('404 - Page not found');
});
//# sourceMappingURL=server.js.map