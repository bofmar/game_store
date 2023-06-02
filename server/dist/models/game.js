import mongoose from "mongoose";
const Schema = mongoose.Schema;
const GameSchema = new Schema({
    title: { type: String, required: true, minLength: 1 },
    release_date: { type: Date, required: true },
    description: { type: String, required: true, minLength: 1 },
    copies_in_stock: { type: Number, required: true, default: 1 },
    price: { type: Number, required: true },
    publisher: { type: Schema.Types.ObjectId, ref: 'Publisher', required: true },
    genres: [{ type: Schema.Types.ObjectId, ref: 'Genre', required: true }],
    consoles: [{ type: Schema.Types.ObjectId, ref: 'Console', required: true }],
    image: String,
});
// Virtual for the url
GameSchema.virtual('url').get(function () {
    return `/catalog/game/${this._id}`;
});
const Game = mongoose.model('Game', GameSchema);
export default Game;
//# sourceMappingURL=game.js.map