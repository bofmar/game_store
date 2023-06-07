import express from 'express';
import Console from '../models/console.js';

// GET all consoles
export const console_get_all = async (_req: express.Request, res: express.Response): Promise<void> => {
	const allConsoles = await Console.find({}).exec();
	res.json(allConsoles);
}

// GET console detail
export const console_get_detailed = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
	const gameConsole = await Console.findById(req.params.id).exec();

	// Console not found?
	if(gameConsole === null) {
		const error = Error('Console not found');
		return next(error);
	}

	res.json(gameConsole);
}