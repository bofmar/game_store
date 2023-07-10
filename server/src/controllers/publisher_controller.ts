import express from 'express';
import Publisher from '../models/publisher.js';
import Game from '../models/game.js';
import { body, validationResult } from 'express-validator';

// GET all publishers
export const publisher_get_all = async (_req: express.Request, res: express.Response): Promise<void> => {
	const allPublishers = await Publisher.find({}).exec();
	res.json(allPublishers);
}

// GET one publisher
export const publisher_get_detailed = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
	const publisher = await Publisher.findById(req.params.id).exec();

	// No publisher?
	if(publisher === null) {
		const error = new Error('Publisher not found');
		return next(error);
	}

	res.json(publisher);
}

// POST new publisher
export const publisher_post_new = [body('name').trim().isLength({min: 1}).escape(),
	body('bio').trim().isLength({min: 1}).escape(),
	body('date_founded').isISO8601().toDate(),
	async (req: express.Request, res: express.Response): Promise<void> => {
		const errors = validationResult(req);
		if(!errors.isEmpty()) {
			res.status(405).send('Invalid data');
			return;
		}

		const publisher = new Publisher({ 
			name: req.body.name,
			bio: req.body.bio,
			date_founded: new Date(req.body.date_founded),
		});

		const publisherExists = await Publisher.findOne({ name: req.body.name }).exec();
		if(!publisherExists) {
			await publisher.save();
			res.status(201).json(publisher);
		}
		else {
			res.status(400).send('Publisher already exists');
		}
	}
];

// UPDATE publisher
export const publisher_update = [body('name').trim().isLength({min: 1}).escape(),
	body('bio').trim().isLength({min: 1}).escape(),
	body('date_founded').isISO8601().toDate(),
		async (req: express.Request, res: express.Response): Promise<void> => {
		const errors = validationResult(req);
		if(!errors.isEmpty()) {
			res.status(405).send('Invalid data');
			return;
		}

		const publisher = new Publisher({
			name: req.body.name,
			bio: req.body.bio,
			date_founded: new Date(req.body.date_founded),
		});

		await Publisher.findByIdAndUpdate(req.params.id, {
			name: req.body.name,
			bio: req.body.bio,
			date_founded: new Date(req.body.date_founded),
		}, {});

		res.status(201).json(publisher);
	}
]

// DELETE publisher
export const publisher_delete = async (req: express.Request, res: express.Response): Promise<void> => {
	const id = req.params.id;

	const publisherExists = await Publisher.findById(id).exec();
	if(!publisherExists) { // No such publisher
		res.status(404).send('No such publisher exists');
		return;
	}
	const deleted = await Publisher.deleteOne({_id: id});
	// Remove the publisher from all Games
	await Game.updateMany({publisher: id}, {publisher: null}); 
	res.status(201).send(deleted);
}
