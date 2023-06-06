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
//# sourceMappingURL=console_controller.js.map