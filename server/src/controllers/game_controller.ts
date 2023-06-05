import express from 'express';
import Game from "../models/game.js";

// Get all games
export const get_all = async (_req: express.Request, res: express.Response): Promise<void> => {
	const allGames = await Game.find({}).populate('publisher').populate('genres').populate('consoles').exec();
	res.json(allGames);
}
