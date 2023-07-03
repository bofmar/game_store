import mongoose, { Types } from "mongoose";
import Genre from "./genre.js";
import Publisher from "./publisher.js";
import Console from "./console.js";

const Schema = mongoose.Schema;

export interface IGame {
	_id: string;
	title: string;
	release_date: Date;
	description: string;
	copies_in_stock: number;
	price: number;
	publisher: Types.ObjectId;
	genres: Array<Types.ObjectId>;
	consoles: Array<Types.ObjectId>;
}

const GameSchema = new Schema<IGame>({
	_id: String,
	title: { type: String, required: true, minLength: 1 },
	release_date: { type: Date, required: true },
	description: { type: String, required: true, minLength: 1 },
	copies_in_stock: { type: Number, required: true, default: 1},
	price: { type: Number, required: true },
	publisher: { type: Schema.Types.ObjectId, ref: Publisher.modelName, required: true },
	genres: [{ type: Schema.Types.ObjectId, ref: Genre.modelName, required: true }],
	consoles: [{ type: Schema.Types.ObjectId, ref: Console.modelName, required: true }]
});

const Game = mongoose.model<IGame>('Game', GameSchema);

export default Game;
