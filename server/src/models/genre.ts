import mongoose from "mongoose";

const Schema = mongoose.Schema;

interface IGenre {
	name: string;
}

const GenreSchema = new Schema<IGenre>({
	name: { type: String, required: true, minLength: 2 }
});

const Genre = mongoose.model<IGenre>('Genre', GenreSchema);

export default Genre;
