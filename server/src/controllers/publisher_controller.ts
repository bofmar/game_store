import express from 'express';
import Publisher from '../models/publisher.js';

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
export const publisher_post_new = async (req: express.Request, res: express.Response): Promise<void> => {
	const publisher = new Publisher({ 
		name: req.body.name,
		bio: req.body.bio,
		date_founded: new Date(req.body.date_founded),
	});

	// TODO SERVER SIDE DATA VALIDATION

	const publisherExists = await Publisher.findOne({ name: req.body.name }).exec();
	if(!publisherExists) {
		await publisher.save();
		res.status(201).json(publisher);
	}
	else {
		res.status(400).send('Publisher already exists');
	}
}

// UPDATE publisher
export const publisher_update = async (req: express.Request, res: express.Response): Promise<void> => {
	const con = new Publisher({
		name: req.body.name,
		bio: req.body.bio,
		date_founded: new Date(req.body.date_founded),
	});

	// TODO SERVER SIDE DATA VALIDATION
	
	await Publisher.findByIdAndUpdate(req.params.id, {
		name: req.body.name,
		bio: req.body.bio,
		date_founded: new Date(req.body.date_founded),
	}, {});

	res.status(201).json(con);
}

// DELETE publisher
export const publisher_delete = async (req: express.Request, res: express.Response): Promise<void> => {
	const id = req.params.id;

	const publisherExists = await Publisher.findById(id).exec();
	if(!publisherExists) { // No such game
		res.status(404).send('No such publisher exists');
		return;
	}

	try {
		const deleted = await Publisher.deleteOne({_id: id});
		res.status(201).send(deleted);
	} catch(e) {
		console.error(`[error] ${e}`);
		throw Error('Error occurred while deleting Person');
	}
}
