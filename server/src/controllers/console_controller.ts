import express from 'express';
import Console from '../models/console.js';

// GET all consoles
export const console_get_all = async (_req: express.Request, res: express.Response): Promise<void> => {
	const allConsoles = await Console.find({}).exec();
	res.json(allConsoles);
}
