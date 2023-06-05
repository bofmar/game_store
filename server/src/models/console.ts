import mongoose from "mongoose";
import { DateTime } from "luxon";

const Schema = mongoose.Schema;

interface IConsole {
	name: string;
	developer_name: string;
	description: string;
	url: string;
	release_date: Date;
	release_date_formated: string;
	discontinued_date?: Date;
	discontinued_date_formated: string;
	image: string;
}

const ConsoleSchema = new Schema<IConsole>({
	name: { type: String, required: true, minLength: 2 },
	developer_name: { type: String, required: true, minLength: 1 },
	description: { type: String, required: true },
	release_date: { type: Date, required: true },
	discontinued_date: Date
});

// Virtual for the url
ConsoleSchema.virtual('url').get(function (): string {
	return `/catalog/console/${this._id}`;
});

// Virtual for image
ConsoleSchema.virtual('image').get(function (): string {
	return `${this._id}`;
});

// Virtual for the formated date of release
ConsoleSchema.virtual('release_date_formated').get(function (): string {
	return DateTime.fromJSDate(this.release_date).toLocaleString(DateTime.DATE_MED);
});

// Virtual for the url
ConsoleSchema.virtual('discontinued_date_formated').get(function (): string {
	return this.discontinued_date ? DateTime.fromJSDate(this.discontinued_date).toLocaleString(DateTime.DATE_MED) : '';
});

const Console = mongoose.model<IConsole>('Console', ConsoleSchema);

export default Console;
