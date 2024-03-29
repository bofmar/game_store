import express from 'express';
import multer from 'multer';
//import path from 'path';
//import url from 'url';

const router = express.Router();

// Import controllers
import * as game_controller from '../controllers/game_controller.js';
import * as publisher_controller from '../controllers/publisher_controller.js';
import * as console_controller from '../controllers/console_controller.js';
import * as genre_controller from '../controllers/genre_controller.js';

/*
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '../..');

const fileStoreageEngine = multer.diskStorage({
	destination: (_req, _file, cb) => {
		cb(null, path.join(ROOT, 'public/images'));
	},
	filename: (req, _file, cb) => {
		console.log(_file.buffer);
		cb(null, `${req.body._id}.jpeg`);
	}
});
*/

const upload = multer();

// Game routes
// GET all games
router.get('/games', game_controller.game_get_all);
// GET game detailed
router.get('/games/:id', game_controller.game_get_detailed);
// POST new game
router.post('/games', upload.single('image'), game_controller.game_post_new);
// Purchase a game
router.post('/games/purchase', game_controller.game_purchse);
// UPDATE game
router.post('/games/:id/update', upload.single('image'), game_controller.game_update);
// DELETE game
router.post('/games/:id/delete', game_controller.game_delete);
// GET all titles
router.get('/games-names', game_controller.games_get_titles_all);

// Publisher routes
// GET all publishers
router.get('/publishers', publisher_controller.publisher_get_all);
// GET publisher detailed
router.get('/publishers/:id', publisher_controller.publisher_get_detailed);
// POST new publisher
router.post('/publishers', publisher_controller.publisher_post_new);
// UPDATE publisher
router.post('/publishers/:id/update', publisher_controller.publisher_update);
// DELETE publisher
router.post('/publishers/:id/delete', publisher_controller.publisher_delete);

// Console routes
// GET all consoles
router.get('/consoles', console_controller.console_get_all);
// GET console detailed
router.get('/consoles/:id', console_controller.console_get_detailed);
// POST new console
router.post('/consoles', console_controller.console_post_new);
// UPDATE console
router.post('/consoles/:id/update', console_controller.console_update);
// DELETE console
router.post('/consoles/:id/delete', console_controller.console_delete);

// Genre routes
// GET all genres
router.get('/genres', genre_controller.genre_get_all);
// GET genre detailed
router.get('/genres/:id', genre_controller.genre_get_detailed);
// POST new genre
router.post('/genres', genre_controller.genre_post_new);
// UPDATE genre
router.post('/genres/:id/update', genre_controller.genre_update);
// DELETE genre
router.post('/genres/:id/delete', genre_controller.genre_delete);

export default router;
