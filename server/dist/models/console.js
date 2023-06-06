import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ConsoleSchema = new Schema({
    name: { type: String, required: true, minLength: 2 },
    developer_name: { type: String, required: true, minLength: 1 },
    description: { type: String, required: true },
    release_date: { type: Date, required: true },
    discontinued_date: Date
});
const Console = mongoose.model('Console', ConsoleSchema);
export default Console;
//# sourceMappingURL=console.js.map