import express from 'express';
import Genre from '../models/genre.js';
import Game from '../models/game.js';
import { body, validationResult } from 'express-validator';

// GET all genres
export const genre_get_all = async (_req: express.Request, res: express.Response): Promise<void> => {
	const allGenres = await Genre.find({}).exec();
	res.json(allGenres);
}

// GET genre details
export const genre_get_detailed = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
	const genre = await Genre.findById(req.params.id).exec();

	// No genre?
	if(genre === null) {
		const error = new Error('Genre not found');
		return next(error);
	}

	res.json(genre);
}

// POST new genre
export const genre_post_new = [body('name', 'Name must not be empty').trim().isLength({min: 1}).escape(), 
	async (req: express.Request, res: express.Response): Promise<void> => {
		const errors = validationResult(req);
		if(!errors.isEmpty()) {
			res.status(405).send('Received empty query');
			return;
		}

		const genre = new Genre({ name: req.body.name});
		const genreExists = await Genre.findOne({ name: req.body.name }).exec();
		
		if(!genreExists) {
			await genre.save();
			res.status(201).json(genre);
		}
		else {
			res.status(400).send('Genre already exists');
		}
	}
];

// UPDATE genre
export const genre_update = [body('name', 'Name must not be empty').trim().isLength({min: 1}).escape(), 
	async (req: express.Request, res: express.Response): Promise<void> => {
		const errors = validationResult(req);
		if(!errors.isEmpty()) {
			res.status(405).send('Received empty query');
			return;
		}

		const genre = new Genre({ name: req.body.name});

		await Genre.findByIdAndUpdate(req.params.id, {name: genre.name}, {});
		res.status(201).json(genre);
	}
];

// DELETE genre
export const genre_delete = async (req: express.Request, res: express.Response): Promise<void> => {
	const id = req.params.id;

	const genreExists = await Genre.findById(id).exec();
	if(!genreExists) { // No such genre
		res.status(404).send('No such genre exists');
		return;
	}
	const deleted = await Genre.deleteOne({_id: id});
	// Remove the genre from all Games
	await Game.updateMany({genres: id}, {$pull: { genres: { $elemMatch: {_id: id}}}}); 
	res.status(201).send(deleted);
}
