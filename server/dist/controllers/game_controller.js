import Game from "../models/game.js";
// Get all games
export const get_all = async (_req, res) => {
    const allGames = await Game.find({}).populate('publisher').populate('genres').populate('consoles').exec();
    res.json(allGames);
};
//# sourceMappingURL=game_controller.js.map