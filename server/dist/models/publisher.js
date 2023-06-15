import mongoose from "mongoose";
import Game from "./game.js";
const Schema = mongoose.Schema;
const PublisherSchema = new Schema({
    name: { type: String, required: true, minLength: 1 },
    date_founded: { type: Date, required: true },
    bio: { type: String, required: true },
});
PublisherSchema.pre('deleteOne', async function (next) {
    const publisherId = this.getQuery()['_id'];
    // Remove games associated with that publisher
    await Game.find({ 'publisher': publisherId }).exec();
    next();
});
const Publisher = mongoose.model('Publisher', PublisherSchema);
export default Publisher;
//# sourceMappingURL=publisher.js.map