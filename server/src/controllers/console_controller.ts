import express from 'express';
import Console from '../models/console.js';
import Game from '../models/game.js';
import { body, validationResult } from 'express-validator';

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
export const console_post_new = [body('name').trim().isLength({min: 1}).escape(),
	body('developer_name').trim().isLength({min: 1}).escape(),
	body('description').trim().isLength({min: 1}).escape(),
	body('release_date').isISO8601().toDate(),
	async (req: express.Request, res: express.Response): Promise<void> => {
		const errors = validationResult(req);

		if(!errors.isEmpty()) {
			res.status(405).send('Invalid data');
			return;
		}

		const con = new Console({ 
			name: req.body.name,
			developer_name: req.body.developer_name,
			description : req.body.description,
			release_date : new Date(req.body.release_date),
		});
		
		if(req.body.discontinuedDate) {
			con.discontinued_date = new Date(req.body.discontinued_date);
		}

		const consoleExists = await Console.findOne({ name: req.body.name }).exec();
		if(!consoleExists) {
			await con.save();
			res.status(201).json(con);
		}
		else {
			res.status(400).send('Console already exists');
		}
	}
];

// UPDATE console
export const console_update = [body('name').trim().isLength({min: 1}).escape(),
	body('developer_name').trim().isLength({min: 1}).escape(),
	body('description').trim().isLength({min: 1}).escape(),
	body('release_date').isISO8601().toDate(),
	async (req: express.Request, res: express.Response): Promise<void> => {
		const errors = validationResult(req);

		if(!errors.isEmpty()) {
			res.status(405).send('Invalid data');
			return;
		}

		const con = new Console({
			name: req.body.name,
			developer_name: req.body.developer_name,
			description : req.body.description,
			release_date : new Date(req.body.release_date),
		});

		await Console.findByIdAndUpdate(req.params.id, {
			name: req.body.name,
			developer_name: req.body.developer_name,
			description : req.body.description,
			release_date : new Date(req.body.release_date),
		}, {});
		res.status(201).json(con);
	}
];

// DELETE genre
export const console_delete = async (req: express.Request, res: express.Response): Promise<void> => {
	const id = req.params.id;

	const consoleExists = await Console.findById(id).exec();
	if(!consoleExists) { // No such console
		res.status(404).send('No such console exists');
		return;
	}
	const deleted = await Console.deleteOne({_id: id});
	// Remove the console from all Games
	await Game.updateMany({consoles: id}, {$pull: { consoles: { $elemMatch: {_id: id}}}}); 
	res.status(201).send(deleted);
}
