import Publisher from '../models/publisher.js';
// GET all publishers
export const publisher_get_all = async (_req, res) => {
    const allPublishers = await Publisher.find({}).exec();
    res.json(allPublishers);
};
// GET one publisher
export const publisher_get_detailed = async (req, res, next) => {
    const publisher = await Publisher.findById(req.params.id).exec();
    // No publisher?
    if (publisher === null) {
        const error = new Error('Publisher not found');
        return next(error);
    }
    res.json(publisher);
};
//# sourceMappingURL=publisher_controller.js.map