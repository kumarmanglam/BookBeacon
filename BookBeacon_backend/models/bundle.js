const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookSchema = new Schema({
    book_name: String,
    book_id: Number,
    is_Premium: Boolean,
    concurrency: Number
});

const bundleSchema = new Schema({
    bundle_id: Number,
    bundle_Name: String,
    booksInBundle: [bookSchema]
});

const Bundle = mongoose.model('Bundle', bundleSchema);

module.exports = { Bundle };
