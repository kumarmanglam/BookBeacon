const mongoose = require("mongoose");
const { Schema } = mongoose;
const { connectDb, dbConnection } = require("../config/config");

const licenseSchema = new Schema({
    _license_id: Number,
    license_name: String,
    bundle_id: Number,
    mode: String,
    booksInBundle: [{
        book_name: String,
        book_id: Number,
        is_Premium: Boolean,
        concurrency: Number
    }]
})

const License = mongoose.model('License', licenseSchema);

const createLicense = async (req, res) => {
    try {

        const connectionClient = await dbConnection();
        const connection = await connectDb();
        const data = req.body;
        // add booksInBundle proterty to data.. for every book which is premium add the concurrency as 1

        // fetch the bundleBooks with matching id.... then set the concurrency..

        const bundleBooksCollection = await connectionClient.collection("bundle_books");

        const bundleBooksById = await bundleBooksCollection.findOne({ bundle_id: parseInt(req.body.bundle_id) });

        console.log(bundleBooksById.booksInBundle);

        // iterate over the bookBunlde array.. if a a book is premium  then add concurreny as 1.... if boook is not premium than add b=concurreency as -1.

        data.booksInBundle = bundleBooksById.booksInBundle;

        const books = data.booksInBundle;

        for (let book of books) {
            if (book.is_Premium == true) {
                book.concurrency = 1;
            } else {
                book.concurrency = -1;
            }
        }

        const newLicense = new License(data);

        const result = await newLicense.save();
        console.log(result);
        res.status(200).json("created license successfully");

    } catch (err) {
        console.log("error in creating license", err);
    }
}

const getLicenseById = async (req, res) => {
    try {
        const connection = await connectDb();
        const licenseId = req.query.license_id;

        const license = await License.findById(licenseId);

        console.log("license ", license);

    } catch (err) {
        res.status(500).json("error in getting license ", err)
    }
}

const getLicenses = async (req, res) => {
    try {
        const connection = await connectDb();


        const licenses = await License.find();

        console.log("licenses :", licenses);

    } catch (err) {
        res.status(500).json("error in getting license ", err)
    }
}

const bulkUpdateLicense = async (req, res) => {
    try {
        const connection = await connectDb();

        const concurrency = req.concurrency;

        const licenses = await License.find();

        licenses.booksInBundle.concurrency = concurrency;

        console.log("licenses :", licenses);

    } catch (err) {
        res.status(500).json("error in bulk license update ", err)
    }
}

module.exports = { createLicense, getLicenseById };

