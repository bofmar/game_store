import express from 'express';
const router = express.Router();
// Import controllers
import * as game_controller from '../controllers/game_controller.js';
import * as publisher_controller from '../controllers/publisher_controller.js';
// Game routes
// GET all games
router.get('/games', game_controller.game_get_all);
// GET game detailed
router.get('/games/:id', game_controller.game_get_detailed);
// Publisher routes
// GET all publishers
router.get('/publishers', publisher_controller.publisher_get_all);
export default router;
//# sourceMappingURL=catalog.js.map