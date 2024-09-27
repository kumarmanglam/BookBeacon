const { Bundle } = require("../models/bundle");
const { License } = require("../models/license");
const createLicense = async (req, res) => {
    console.log("create lineceses ran");
    try {
        const data = req.body.data;

        const custom = req.query.custom;
        console.log("data....", data);

        let bundleBooksByBundleId = await Bundle.findOne({ bundle_id: req.body.data.bundle_id });
        console.log(bundleBooksByBundleId);
        if (custom == 'default') {
            if (req.body.data.mode == "normal") {
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
            let variableBundleBooks = req.body.data.booksInBundle;

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

const EditLicense = async (req, res) => {

    try {
        console.log("edit ran");
        const custom = req.query.custom;

        const license = await License.findById(req.body.license_id);
        console.log(custom);
        if (custom == "default") {
            console.log("inside bulk update")
            const concurrency = req.body.concurrency;

            console.log("concurrency...", concurrency);



            // console.log("license ", license)

            const books = license.booksInBundle;

            console.log("books inside bundle ", books)

            for (let book of books) {
                if (book.is_Premium) {
                    book.concurrency = concurrency;
                }
                else {
                    book.concurrency = -1;
                }
            }
            console.log(books)
            license.booksInBundle = books;

            res.status(200).json(license);
        }

        else {
            console.log("else condition")
            const variableConcurrencybooksInBundle = req.body.booksInBundle;
            console.log(variableConcurrencybooksInBundle);
            const variableBookConcurrencyMap = new Map();

            variableConcurrencybooksInBundle.forEach(item => variableBookConcurrencyMap.set(Number(item.book_id), item.concurrency));
            console.log(variableBookConcurrencyMap);
            const bundleBooks = license.booksInBundle;

            const updatedBundleBooksConcurrency = bundleBooks.map((book) => {
                console.log(book.book_id)
                console.log(variableBookConcurrencyMap.has(Number(book.book_id)))
                if (variableBookConcurrencyMap.has(book.book_id)) {
                    console.log(variableBookConcurrencyMap.has(book.book_id));
                    book.concurrency = variableBookConcurrencyMap.get(book.book_id);
                    console.log(book);
                    return book;
                } else {
                    // if (book.is_Premium) {
                    //     book.concurrency = 1;
                    // } else {
                    //     book.concurrency = -1;
                    // }
                    // console.log(book);

                    return book;
                }
            });

            bundleBooks.booksInBundle = updatedBundleBooksConcurrency;
            license.booksInBundle = updatedBundleBooksConcurrency;
            res.status(200).json(license);
        }
        await license.save();
    } catch (err) {
        res.status(500).json({ "error in bulk license update ": err });
        console.log(err)
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

module.exports = { createLicense, getLicenseById, getLicenses, EditLicense, UpdateBookConcurrencyInLicense };

