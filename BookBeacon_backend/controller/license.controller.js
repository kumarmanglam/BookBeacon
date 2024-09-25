const { Bundle } = require("../models/bundle");
const { License } = require("../models/license");
const createLicense = async (req, res) => {
    console.log("create lineceses ran");
    try {
        const data = req.body;

        const custom = req.query.custom;
        console.log(custom)

        const bundleBooksByBundleId = await Bundle.findOne({ bundle_id: Number(req.body.bundle_id) });
        if (custom == 'default') {
            if (req.body.mode == "normal") {
                const bookList = bundleBooksByBundleId.booksInBundle;
                const filteredBooks = bookList.filter((book) => book.is_Premium == false);
                data.booksInBundle = filteredBooks;
            } else { // premium books
                data.booksInBundle = bundleBooksByBundleId.booksInBundle;
                const books = data.booksInBundle;
                for (let book of books) {
                    if (book.is_Premium == true) {
                        book.concurrency = data.concurrency;
                    } else {
                        book.concurrency = -1;
                    }
                }
            }
        } else { // custom is variable
            // pure javascript operation
            // create custom book list from bundleId
            // we will data
            console.log("variable case")
            let variableBundleBooks = req.body.booksInBundle;

            // create a hashmap of variable bundleBooks -> {key: value} {book_id: concurreny}
            const variableBookConcurrencyMap = new Map();

            variableBundleBooks.forEach(item => variableBookConcurrencyMap.set(item.book_id, item.concurrency));
            const bundleBooks = bundleBooksByBundleId.booksInBundle
            let updatedBundleBooks = bundleBooks.map(entry => {
                // if entry . book_id is present in variableBundleBooks the update the entry
                // is hashMap.contains(book_id) then entry.concurrency = map.get(book_id);
                if (variableBookConcurrencyMap.has(entry.book_id)) {
                    entry.concurrency = variableBookConcurrencyMap.get(entry.book_id);
                    console.log(entry)
                    return entry;
                } else {
                    if (entry.is_Premium) {
                        entry.concurrency = 1;
                    } else {
                        entry.concurrency = -1;
                    }
                    console.log(entry)
                    return entry;
                }
            });
            data.booksInBundle = updatedBundleBooks;
            // console.log({ updatedBundleBooks })
        }
        const newLicense = new License(data);
        const result = await newLicense.save();
        res.status(200).json("created license successfully");
    } catch (err) {
        console.log({ err })
        res.status(400).json({ err });
    }
}

const getLicenseById = async (req, res) => {
    try {
        const licenseId = req.params.license_id;

        console.log(licenseId);

        const license = await License.findById(licenseId);

        console.log("license.... ", license);

        res.status(200).json(license);

    } catch (err) {
        res.status(500).json("error in getting license ", err)
    }
}

const getLicenses = async (req, res) => {
    try {
        const licenses = await License.find();

        console.log("licenses :", licenses);

        res.status(200).json(licenses);

    } catch (err) {
        res.status(500).json("error in getting license ", err)
    }
}

const bulkUpdateLicense = async (req, res) => {
    try {
        console.log("inside bulk update")
        const concurrency = req.body.concurrency;

        console.log("concurrency...", concurrency);

        const license = await License.findById(req.body.id);

        // console.log("license ", license)

        const books = license.booksInBundle;

        console.log("books inside bundle ", books)

        for (let book of books) {
            book.concurrency = concurrency;
            console.log(book.concurrency = concurrency);
        }

        res.status(200).json(license);


    } catch (err) {
        res.status(500).json("error in bulk license update ", err)
    }
}


const UpdateBookConcurrencyInLicense = async (req, res) => {

    try {
        const concurrency = req.body.concurrency;

        const license = await License.findById(req.body.license_id);

        const books = license.booksInBundle;
        const bookId = req.body.book_id;
        console.log("bookId", bookId);

        for (let book of books) {

            if (book.book_id == bookId) {
                book.concurrency = concurrency;
            }
        }

        console.log("concurrency updated")

        res.status(200).json(license);


    } catch (err) {
        res.status(500).json({ message: "Error in single book concurrency update", error: err });

    }
}

module.exports = { createLicense, getLicenseById, getLicenses, bulkUpdateLicense, UpdateBookConcurrencyInLicense };

