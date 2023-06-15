import mongoose from "mongoose";

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

const Publisher = mongoose.model<IPublisher>('Publisher', PublisherSchema);

export default Publisher;
