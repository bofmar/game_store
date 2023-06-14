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
    // TODO SERVER SIDE DATA VALIDATION
    if (!genreExists) {
        await genre.save();
        res.status(201).json(genre);
    }
    else {
        res.status(400).send('Genre already exists');
    }
};
// UPDATE genre
export const genre_update = async (req, res) => {
    const genre = new Genre({ name: req.body.name });
    // TODO SERVER SIDE DATA VALIDATION
    await Genre.findByIdAndUpdate(req.params.id, { name: genre.name }, {});
    res.status(201).json(genre);
};
//# sourceMappingURL=genre_controller.js.map