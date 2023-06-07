import Genre from '../models/genre.js';
// GET all genres
export const genre_get_all = async (_req, res) => {
    const allGenres = await Genre.find({}).exec();
    res.json(allGenres);
};
// GET genre details
export const genre_get_detailed = async (req, res, next) => {
    const genre = await Genre.findById(req.params.id).exec();
    // No genre?
    if (genre === null) {
        const error = new Error('Genre not found');
        return next(error);
    }
    res.json(genre);
};
// POST new genre
export const genre_post_new = async (req, res) => {
    const genre = new Genre({ name: req.body.name });
    const genreExists = await Genre.findOne({ name: req.body.name }).exec();
    if (!genreExists) {
        await genre.save();
        res.status(201).json(genre);
    }
    else {
        res.status(400).send('Genre allready exists');
    }
};
//# sourceMappingURL=genre_controller.js.map