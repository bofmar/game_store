import mongoose from "mongoose";
import { DateTime } from 'luxon';

const Schema = mongoose.Schema;

interface IPublisher {
	name: string;
	date_founded: Date;
	date_founded_formated: string;
	bio: string;
	url: string;
	external_url?: string;
	logo?: string;
}

const PublisherSchema = new Schema<IPublisher>({
	name: { type: String, required: true, minLength: 1 },
	date_founded: { type: Date, required: true },
	bio: { type: String, required: true },
	external_url: String,
	logo: String
});

// Virtual for the internal url
PublisherSchema.virtual('url').get(function () {
	return `/catalog/publisher/${this.id}`;
});

// Virtual for formated date of founding
PublisherSchema.virtual('date_founded_formated').get(function () {
	return DateTime.fromJSDate(this.date_founded).toLocaleString(DateTime.DATE_MED);
});

const Publisher = mongoose.model<IPublisher>('Publisher', PublisherSchema);

export default Publisher;
