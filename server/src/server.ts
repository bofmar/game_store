// Libraries
import express from 'express';
import path from 'path';
import url from 'url';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
// Middleware
import cors from 'cors';
import morgan from 'morgan';
// Routes
import catalogRouter from './routes/catalog.js';

dotenv.config();

// Constants
const PORT = process.env.PORT || 5000;
const IS_DEV = process.env.DEV;
const MONGOURI = process.env.MONGO_PROD_URI;
const runningMessage = `Listening for requests on port ${PORT}`; 
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..');

const app = express();

// Connect to mongo and listen for requests
mongoose.connect(MONGOURI as string).then(_result => {
	app.listen(PORT, () => console.log(runningMessage));
}).catch(error => {
	console.log(error);
});

// Middleware
app.use(cors());
app.use(morgan(IS_DEV ? 'dev' : 'common'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static(path.join(ROOT, 'public/images')));

app.use('/catalog', catalogRouter);

// Error fallbacks
// Seve default image if the requested image is not found
app.use('/images', (_req: express.Request, res: express.Response): void => {
	res.sendFile(path.join(ROOT, 'public/images/default.jpeg'));
});

// Handle generic 404
app.use((_req: express.Request, res: express.Response): void => {
	res.status(404).send('404 - Page not found');
});
