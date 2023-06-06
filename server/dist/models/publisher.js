import mongoose from "mongoose";
const Schema = mongoose.Schema;
const PublisherSchema = new Schema({
    name: { type: String, required: true, minLength: 1 },
    date_founded: { type: Date, required: true },
    bio: { type: String, required: true },
});
const Publisher = mongoose.model('Publisher', PublisherSchema);
export default Publisher;
//# sourceMappingURL=publisher.js.map