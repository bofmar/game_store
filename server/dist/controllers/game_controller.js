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
// POST new game
export const game_post_new = async (req, res) => {
    /*
    const con = new Console({
        name: req.body.name,
        developer_name: req.body.developer_name,
        description : req.body.description,
        release_date : new Date(req.body.release_date),
    });
    
    if(req.body.discontinuedDate) {
        con.discontinued_date = new Date(req.body.discontinued_date);
    }

    // TODO SERVER SIDE DATA VALIDATION

    const consoleExists = await Console.findOne({ name: req.body.name }).exec();
    if(!consoleExists) {
        await con.save();
        res.status(201).json(con);
    }
    else {
        res.status(400).send('Console already exists');
    }
    */
    console.log(req);
    res.send('File uploaded');
};
//# sourceMappingURL=game_controller.js.map