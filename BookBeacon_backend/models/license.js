const mongoose = require("mongoose");
const { Schema } = mongoose;


const licenseSchema = new Schema({
    _license_id: Number,
    license_name: String,
    bundle_id: Number,
    mode: String,
    start_date: Date,
    end_date: Date,
    purchase_date: Date,
    booksInBundle: [{
        book_name: String,
        book_id: Number,
        is_Premium: Boolean,
        concurrency: Number
    }]
})

const License = mongoose.model('License', licenseSchema);

module.exports = { License };