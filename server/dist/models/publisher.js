import mongoose from "mongoose";
import { DateTime } from 'luxon';
const Schema = mongoose.Schema;
const PublisherSchema = new Schema({
    name: { type: String, required: true, minLength: 1 },
    date_founded: { type: Date, required: true },
    bio: { type: String, required: true },
    external_url: String,
    logo: String
});
// Virtual for the internal url
PublisherSchema.virtual('url').get(function () {
    return `/catalog/publisher/${this._id}`;
});
// Virtual for formated date of founding
PublisherSchema.virtual('date_founded_formated').get(function () {
    return DateTime.fromJSDate(this.date_founded).toLocaleString(DateTime.DATE_MED);
});
const Publisher = mongoose.model('Publisher', PublisherSchema);
export default Publisher;
//# sourceMappingURL=publisher.js.map