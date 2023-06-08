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

// POST new console
export const console_post_new = async (req: express.Request, res: express.Response): Promise<void> => {
	const con = new Console({ 
		name: req.body.name,
		developer_name: req.body.developer,
		description : req.body.description,
		release_data : req.body.releaseDate,
	});
	
	if(req.body.discontinuedDate) {
		con.discontinued_date = req.body.discontinuedDate;
	}

	const consoleExists = await Console.findOne({ name: req.body.name }).exec();
	if(!consoleExists) {
		await con.save();
		res.status(201).json(con);
	}
	else {
		res.status(400).send('Genre allready exists');
	}
}
