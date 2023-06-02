import mongoose from "mongoose";
const Schema = mongoose.Schema;
const GenreSchema = new Schema({
    name: { type: String, required: true, minLength: 3 }
});
// Virtual for URL
GenreSchema.virtual('url').get(function () {
    return `/catalog/genre/${this.id}`;
});
const Genre = mongoose.model('Genre', GenreSchema);
export default Genre;
//# sourceMappingURL=genre.js.map