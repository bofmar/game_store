import mongoose from "mongoose";
import Genre from "./genre.js";
import Publisher from "./publisher.js";
import Console from "./console.js";
const Schema = mongoose.Schema;
const GameSchema = new Schema({
    _id: String,
    title: { type: String, required: true, minLength: 1 },
    release_date: { type: Date, required: true },
    description: { type: String, required: true, minLength: 1 },
    copies_in_stock: { type: Number, required: true, default: 1 },
    price: { type: Number, required: true },
    publisher: { type: Schema.Types.ObjectId, ref: Publisher.modelName, required: true },
    genres: [{ type: Schema.Types.ObjectId, ref: Genre.modelName, required: true }],
    consoles: [{ type: Schema.Types.ObjectId, ref: Console.modelName, required: true }],
    image: { type: String, required: true }
});
const Game = mongoose.model('Game', GameSchema);
export default Game;
//# sourceMappingURL=game.js.map