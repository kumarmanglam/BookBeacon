const { dbConnection } = require("../config/config");

const getBundleBooks = async (req, res) => {
    try {
        const connection = await dbConnection();

        const bundleBooksCollection = await connection.collection("bundle_books");

        const booksInBundle = await bundleBooksCollection.find().toArray();

        return res.json(booksInBundle).status(200);
    } catch (err) {
        res.status(500).json({ "Error in getting data: ": err });
    }
}

const getBundleBooksById = async (req, res) => {
    try {
        console.log("hello")
        const connection = await dbConnection();
        console.log("connected to db")

        const bundleBooksCollection = await connection.collection("bundle_books");
        console.log(req.query);

        const getBooksByBundleId = await bundleBooksCollection.find({ bundle_id: parseInt(req.query.bundle_id) }).toArray();

        console.log({ getBooksByBundleId });

        return res.json(getBooksByBundleId).status(200);
    } catch (err) {
        res.status(500).json({ "Error in getting data: ": err });
    }
}

module.exports = { getBundleBooks, getBundleBooksById };