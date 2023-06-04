import mongoose from "mongoose";
import { DateTime } from "luxon";
const Schema = mongoose.Schema;
const ConsoleSchema = new Schema({
    name: { type: String, required: true, minLength: 2 },
    developer_name: { type: String, required: true, minLength: 1 },
    description: { type: String, required: true },
    release_date: { type: Date, required: true },
    discontinued_date: Date,
    image: String
});
// Virtual for the url
ConsoleSchema.virtual('url').get(function () {
    return `/catalog/console/${this._id}`;
});
// Virtual for the formated date of release
ConsoleSchema.virtual('release_date_formated').get(function () {
    return DateTime.fromJSDate(this.release_date).toLocaleString(DateTime.DATE_MED);
});
// Virtual for the url
ConsoleSchema.virtual('discontinued_date_formated').get(function () {
    return this.discontinued_date ? DateTime.fromJSDate(this.discontinued_date).toLocaleString(DateTime.DATE_MED) : '';
});
const Console = mongoose.model('Console', ConsoleSchema);
export default Console;
//# sourceMappingURL=console.js.map