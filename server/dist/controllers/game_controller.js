import Game from "../models/game.js";
import Genre from '../models/genre.js';
import Console from '../models/console.js';
import mongoose from 'mongoose';
// Get all games
export const game_get_all = async (_req, res) => {
    const allGames = await Game.find({}).populate('publisher').populate('genres').populate('consoles').exec();
    res.json(allGames);
};
// Get one game by id
export const game_get_detailed = async (req, res, next) => {
    const game = await Game.findById(req.params.id).populate('publisher').populate('genres').populate('consoles').exec();
    // No game found?
    if (game === null) {
        const error = new Error('Game not found');
        return next(error);
    }
    res.json(game);
};
// POST new game
export const game_post_new = async (req, res) => {
    // BUGS
    // NO GENRES ARE ADDED
    // NO CONSOLES ARE ADDED
    const publisherId = req.body.publisher;
    const genreId = [req.body.genres];
    const consolesId = [req.body.consoles];
    const allGenres = await Genre.find({}).exec();
    const allConsoles = await Console.find({}).exec();
    //console.log(genreId);
    //res.send('ok');
    const game = new Game({
        _id: req.body._id,
        title: req.body.title,
        release_date: req.body.release_date,
        description: req.body.description,
        copies_in_stock: parseInt(req.body.copies_in_stock),
        price: parseFloat(req.body.price),
        publisher: new mongoose.Types.ObjectId(publisherId._id),
        genres: allGenres.filter(g => genreId.includes({ _id: g._id })),
        consoles: allConsoles.filter(c => consolesId.includes({ _id: c._id })),
    });
    // TODO SERVER SIDE DATA VALIDATION
    const gameExists = await Game.findOne({ title: req.body.title }).exec();
    if (!gameExists) {
        await game.save();
        res.status(201).json(game);
    }
    else {
        res.status(400).send('Console already exists');
    }
};
//# sourceMappingURL=game_controller.js.map