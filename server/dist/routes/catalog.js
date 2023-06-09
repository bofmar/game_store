import express from 'express';
const router = express.Router();
// Import controllers
import * as game_controller from '../controllers/game_controller.js';
import * as publisher_controller from '../controllers/publisher_controller.js';
import * as console_controller from '../controllers/console_controller.js';
import * as genre_controller from '../controllers/genre_controller.js';
// Game routes
// GET all games
router.get('/games', game_controller.game_get_all);
// GET game detailed
router.get('/games/:id', game_controller.game_get_detailed);
// Publisher routes
// GET all publishers
router.get('/publishers', publisher_controller.publisher_get_all);
// GET publisher detailed
router.get('/publishers/:id', publisher_controller.publisher_get_detailed);
// POST new publisher
router.post('/publishers', publisher_controller.publisher_post_new);
// Console routes
// GET all consoles
router.get('/consoles', console_controller.console_get_all);
// GET console detailed
router.get('/consoles/:id', console_controller.console_get_detailed);
// POST new console
router.post('/consoles', console_controller.console_post_new);
// Genre routes
// GET all genres
router.get('/genres', genre_controller.genre_get_all);
// GET genre detailed
router.get('/genres/:id', genre_controller.genre_get_detailed);
// POST new genre
router.post('/genres', genre_controller.genre_post_new);
export default router;
//# sourceMappingURL=catalog.js.map