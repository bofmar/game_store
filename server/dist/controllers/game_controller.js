import Game from "../models/game.js";
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
//# sourceMappingURL=game_controller.js.map