import Console from '../models/console.js';
// GET all consoles
export const console_get_all = async (_req, res) => {
    const allConsoles = await Console.find({}).exec();
    res.json(allConsoles);
};
// GET console detail
export const console_get_detailed = async (req, res, next) => {
    const gameConsole = await Console.findById(req.params.id).exec();
    // Console not found?
    if (gameConsole === null) {
        const error = Error('Console not found');
        return next(error);
    }
    res.json(gameConsole);
};
// POST new console
export const console_post_new = async (req, res) => {
    const con = new Console({
        name: req.body.name,
        developer_name: req.body.developer,
        description: req.body.description,
        release_data: req.body.releaseDate,
    });
    if (req.body.discontinuedDate) {
        con.discontinued_date = req.body.discontinuedDate;
    }
    const consoleExists = await Console.findOne({ name: req.body.name }).exec();
    if (!consoleExists) {
        await con.save();
        res.status(201).json(con);
    }
    else {
        res.status(400).send('Genre allready exists');
    }
};
//# sourceMappingURL=console_controller.js.map