import express from 'express';
import Genre from '../models/genre.js';

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
