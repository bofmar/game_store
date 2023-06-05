import express from 'express';

const router = express.Router();

// Import controllers
import * as game_controller from '../controllers/game_controller.js';

// Game routes
// GET all games
router.get('/games', game_controller.get_all);

export default router;
