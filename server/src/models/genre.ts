import mongoose from "mongoose";

const Schema = mongoose.Schema;

interface IGenre {
	name: string;
	url: string;
}

const GenreSchema = new Schema<IGenre>({
	name: { type: String, required: true, minLength: 3 }
});

// Virtual for URL
GenreSchema.virtual('url').get(function (): string {
	return `/catalog/genre/${this._id}`;
});

const Genre = mongoose.model<IGenre>('Genre', GenreSchema);

export default Genre;
