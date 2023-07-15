import express from 'express';
import Game, { IGame } from "../models/game.js";
import Console from '../models/console.js';
import Publisher from '../models/publisher.js';
import Genre from '../models/genre.js';
import { body, validationResult } from 'express-validator';

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

// Get all games titles
export const games_get_titles_all = async (_req: express.Request, res: express.Response): Promise<void> => {
	const allTitles = await Game.find({}).select('title').exec();
	res.json(allTitles);
}

// POST new game
export const game_post_new = [body('title').trim().isLength({min: 1}).escape(),
	body('_id').trim().isLength({min: 12}).escape(),
	body('description').trim().isLength({min: 1}).escape(),
	body('copies_in_stock').trim().isLength({min: 1}).isNumeric(),
	body('price').trim().isLength({min: 3}).isNumeric(),
	body('release_date').isISO8601().toDate(),
	async (req: express.Request, res: express.Response): Promise<void> => {
		const errors = validationResult(req);

		if(!errors.isEmpty()) {
			res.status(405).send('Invalid data');
			return;
		}

		const publisherId = JSON.parse(req.body.publisher);
		const genreId = [req.body.genres].map(g => JSON.parse(g)).flat();
		const consolesId = [req.body.consoles].map(c => JSON.parse(c)).flat();

		const publisher = await Publisher.findById(publisherId._id, '_id').exec();
		const allGenres = await Genre.find({}, '_id').exec();
		const allConsoles = await Console.find({}, '_id').exec();

		const imageBuffer = req.file === undefined ? 'none' : req.file.buffer.toString('base64');

		const game = new Game({ 
			_id: req.body._id,
			title: req.body.title,
			release_date: req.body.release_date,
			description: req.body.description,
			copies_in_stock: parseInt(req.body.copies_in_stock),
			price: parseFloat(req.body.price),
			publisher: publisher,
			genres: allGenres.filter(genre => genreId.some(g => genre._id.equals(g._id))),
			consoles: allConsoles.filter(con => consolesId.some(c => con._id.equals(c._id))),
			image: imageBuffer
		});

		const gameExists = await Game.findOne({ title: req.body.title }).exec();
		if(!gameExists) {
			await game.save();
			res.status(201).json(game);
		}
		else {
			res.status(400).send('Console already exists');
		}
	}

];

// UPDATE game
export const game_update = [body('title').trim().isLength({min: 1}).escape(),
	body('_id').trim().isLength({min: 1}).escape(),
	body('description').trim().isLength({min: 1}).escape(),
	body('copies_in_stock').trim().isLength({min: 1}).isNumeric(),
	body('price').trim().isLength({min: 3}).isNumeric(),
	body('release_date').isISO8601().toDate(),
	async (req: express.Request, res: express.Response): Promise<void> => {
		const errors = validationResult(req);

		if(!errors.isEmpty()) {
			res.status(405).send('Invalid data');
			return;
		}

		const prevGame = await Game.findById(req.body._id).exec();

		if(!prevGame) {
			res.status(405).send('No such game');
		}

		const publisherId = JSON.parse(req.body.publisher);
		const genreId = [req.body.genres].map(g => JSON.parse(g)).flat();
		const consolesId = [req.body.consoles].map(c => JSON.parse(c)).flat();

		const publisher = await Publisher.findById(publisherId._id, '_id').exec();
		const allGenres = await Genre.find({}, '_id').exec();
		const allConsoles = await Console.find({}, '_id').exec();

		const imageBuffer = req.file === undefined ? '' : req.file.buffer.toString('base64');

		const game = new Game({ 
			_id: req.body._id,
			title: req.body.title,
			release_date: req.body.release_date,
			description: req.body.description,
			copies_in_stock: parseInt(req.body.copies_in_stock),
			price: parseFloat(req.body.price),
			publisher: publisher,
			genres: allGenres.filter(genre => genreId.some(g => genre._id.equals(g._id))),
			consoles: allConsoles.filter(con => consolesId.some(c => con._id.equals(c._id))),
			image: imageBuffer ? imageBuffer : prevGame?.image
		});


		const theGame =	await Game.findByIdAndUpdate(game._id, game, {}).exec();
		res.status(201).json(theGame);
	}
];

// DELETE game
export const game_delete = async (req: express.Request, res: express.Response): Promise<void> => {
	const id = req.params.id;

	const gameExists = await Game.findById(id).exec();
	if(!gameExists) { // No such game
		res.status(404).send('No such game exists');
		return;
	}

	await Game.findByIdAndDelete(id);
	res.status(201).send('Deleted');
}

type TAvailabilityStatus = 'NOT FOUND' | 'NO COPIES' | 'NOT ENOUGH COPIES' | 'OK';

const checkGameAvailability = async(gameId: string, allGames: Array<IGame>): Promise<TAvailabilityStatus> => {
	const game = await Game.findById(gameId).exec();
	const totalPurchases = allGames.reduce((total, g) => {
		if(g._id === gameId) {
			return total + 1;
		}
		else {
			return total;
		}
	}, 0);

	if(game === null) {
		return 'NOT FOUND';
	} else if (game.copies_in_stock === 0) {
		return 'NO COPIES';
	} else if (totalPurchases > game.copies_in_stock) {
		return 'NOT ENOUGH COPIES';
	} else {
		return 'OK';
	}
}

// PURCHASE game
export const game_purchse = async(req: express.Request, res: express.Response ): Promise<void> => {
	const games: Array<IGame> = req.body;
	// Get only the unique games from the request, so that we don't have to check the availability
	// of the same game again and again
	const uniqueGameIds: Array<string> = Array.from(new Set(games.map(game => game._id)));

	// Check that all games are available
	for(let i = 0; i < uniqueGameIds.length; i++) {
		const result = await checkGameAvailability(uniqueGameIds[i], games);
		if (result === 'NOT FOUND') {
			res.status(404).send('Game not found');
			return;
		} else if (result === 'NO COPIES') {
			res.status(400).send('No copies left');
			return;
		} else if (result === 'NOT ENOUGH COPIES') {
			res.status(400).send('Not enough copies');
			return;
		}
	}
	// Decrease game copies
	for(let i = 0; i < games.length; i++) {
		await Game.findOneAndUpdate({_id: games[i]._id}, {$inc: {copies_in_stock: -1}})
	}
	res.status(201).send('Game purchased');
}

