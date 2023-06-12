import express from 'express';
import Game from "../models/game.js";
import Console from '../models/console.js';
import Publisher from '../models/publisher.js';
import Genre from '../models/genre.js';

// Get all games
export const game_get_all = async (_req: express.Request, res: express.Response): Promise<void> => {
	const allGames = await Game.find({}).populate('publisher').populate('genres').populate('consoles').exec();
	res.json(allGames);
}

// Get one game by id
export const game_get_detailed = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
	const game = await Game.findById(req.params.id).populate('publisher').populate('genres').populate('consoles').exec();
	// No game found?
	if(game === null) {
		const error = new Error('Game not found');
		return next(error);
	}

	res.json(game);
}

// POST new game
export const game_post_new = async (req: express.Request, res: express.Response): Promise<void> => {
	const publisherId = JSON.parse(req.body.publisher);
	const genreId = [req.body.genres].map(g => JSON.parse(g)).flat();
	const consolesId = [req.body.consoles].map(c => JSON.parse(c)).flat();

	const publisher = await Publisher.findById(publisherId._id, '_id').exec();
	const allGenres = await Genre.find({}, '_id').exec();
	const allConsoles = await Console.find({}, '_id').exec();

	const game = new Game({ 
		_id: req.body._id,
		title: req.body.title,
		release_date: req.body.release_date,
		description: req.body.description,
		copies_in_stock: parseInt(req.body.copies_in_stock),
		price: parseFloat(req.body.price),
		publisher: publisher,
		genres: allGenres.filter(genre => genreId.some(g => genre._id.equals(g._id))),
		consoles: allConsoles.filter(con => consolesId.some(c => con._id.equals(c._id)))
	});

	// TODO SERVER SIDE DATA VALIDATION

	const gameExists = await Game.findOne({ title: req.body.title }).exec();
	if(!gameExists) {
		await game.save();
		res.status(201).json(game);
	}
	else {
		res.status(400).send('Console already exists');
	}
}
