const dbConnection = require("../config/config");

const getBundleBooks = async (req, res) => {
    try {

        const connection = await dbConnection();

        const bundleBooksCollection = await connection.collection("bundle_books");

        const booksInBundle = await bundleBooksCollection.find().toArray();

        return res.json(booksInBundle).status(200);
    } catch (err) {
        res.status(500).send("Error in getting data: ", err);
    }
}
module.exports = { getBundleBooks };