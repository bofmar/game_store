import mongoose from "mongoose";

const Schema = mongoose.Schema;

interface IConsole {
	name: string;
	developer_name: string;
	description: string;
	release_date: Date;
	discontinued_date?: Date;
}

const ConsoleSchema = new Schema<IConsole>({
	name: { type: String, required: true, minLength: 2 },
	developer_name: { type: String, required: true, minLength: 1 },
	description: { type: String, required: true },
	release_date: { type: Date, required: true },
	discontinued_date: Date
});

const Console = mongoose.model<IConsole>('Console', ConsoleSchema);

export default Console;
