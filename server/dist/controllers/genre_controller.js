import Genre from '../models/genre.js';
// GET all genres
export const genre_get_all = async (_req, res) => {
    const allGenres = await Genre.find({}).exec();
    res.json(allGenres);
};
//# sourceMappingURL=genre_controller.js.map