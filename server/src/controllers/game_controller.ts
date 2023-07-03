import express from 'express';
import Game, { IGame } from "../models/game.js";
import Console from '../models/console.js';
import Publisher from '../models/publisher.js';
import Genre from '../models/genre.js';
import url from 'url';
import path from 'path';
import { unlink } from 'fs';

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

// UPDATE game
export const game_update = async (req: express.Request, res: express.Response): Promise<void> => {
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

	const theGame =	await Game.findByIdAndUpdate(game._id, game, {}).exec();
	res.status(201).json(theGame);
}

// DELETE game
export const game_delete = async (req: express.Request, res: express.Response): Promise<void> => {
	const __filename = url.fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);
	const ROOT = path.join(__dirname, '../..');
	const id = req.params.id;

	const gameExists = await Game.findById(id).exec();
	if(!gameExists) { // No such game
		res.status(404).send('No such game exists');
		return;
	}

	await Game.findByIdAndDelete(id);
	res.status(201).send('Deleted');

	// Remove orphaned image if it exists
	unlink(path.join(ROOT, `public/images/${id}.jpeg`),(err) => {
		if(err) console.log(err);
		console.log(`Removed ${id}.jpeg`);
	});
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

	/*
	// Decrease game copies
	for(let i = 0; i < games.length; i++) {
		await Game.findOneAndUpdate({_id: games[i]._id}, {$inc: {copies_in_stock: -1}})
	}
	*/

	res.status(201).send('Game purchased');
}

