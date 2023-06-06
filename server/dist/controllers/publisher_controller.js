import Publisher from '../models/publisher.js';
// Get all publishers
export const publisher_get_all = async (_req, res) => {
    const allPublishers = await Publisher.find({}).exec();
    res.json(allPublishers);
};
//# sourceMappingURL=publisher_controller.js.map