import express from 'express';
import Genre from '../models/genre.js';

// GET all genres
export const genre_get_all = async (_req: express.Request, res: express.Response): Promise<void> => {
	const allGenres = await Genre.find({}).exec();
	res.json(allGenres);
}
