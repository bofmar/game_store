import express from 'express';
import path from 'path';
import url from 'url';
import dotenv from 'dotenv';
import cors from 'cors';
//import mongoose from 'mongoose';
dotenv.config();
const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGOURL;
const runningMessage = `Listening for requests on port ${PORT}`;
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(cors());
// Say hi
app.get('/', (_req, res) => {
    res.json({ message: 'Hello from the backend' });
});
app.listen(PORT, () => console.log(runningMessage, `MONGOURL: ${MONGOURL}`, `filename: ${__filename}`, `dirname: ${__dirname}`));
//# sourceMappingURL=server.js.map