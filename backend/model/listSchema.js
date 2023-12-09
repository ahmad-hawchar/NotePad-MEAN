import mongoose from "mongoose";
const Schema = mongoose.Schema;
const listSchema = new Schema({
    userId: { type: String, index: true },
    list: [{
        title: String,
        AddedOn: Date,
        textContent: String,
        WorkedOn: Boolean,
        color: String
    }]
});
export default listSchema;