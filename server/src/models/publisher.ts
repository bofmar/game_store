import mongoose from "mongoose";
import Game from "./game.js";

const Schema = mongoose.Schema;

interface IPublisher {
	name: string;
	date_founded: Date;
	bio: string;
}

const PublisherSchema = new Schema<IPublisher>({
	name: { type: String, required: true, minLength: 1 },
	date_founded: { type: Date, required: true },
	bio: { type: String, required: true },
});

PublisherSchema.pre('deleteOne', async function(next) {
	const publisherId = this.getQuery()['_id'];
	
	// Remove games associated with that publisher
	await Game.find({'publisher': publisherId}).exec();

	next();
});

const Publisher = mongoose.model<IPublisher>('Publisher', PublisherSchema);

export default Publisher;
