// Libraries
import express from 'express';
import path from 'path';
import url from 'url';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
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
mongoose.connect(MONGOURI).then(_result => {
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
app.get('/', (_req, res) => {
    res.json({ message: 'Hello from the backend' });
});
app.use((_req, res) => {
    res.status(404).send('404 - Page not found');
});
//# sourceMappingURL=server.js.map