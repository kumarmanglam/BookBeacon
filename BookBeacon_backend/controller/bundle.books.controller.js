const { error } = require("console");
const { Bundle } = require("../models/bundle");
const fs = require('fs');

const getBundleBooks = async (req, res) => {
    try {

        const booksInBundle = await Bundle.find();
        console.log("booksInBundle.....", booksInBundle)


        return res.json(booksInBundle).status(200);
    } catch (err) {
        res.status(500).json({ "Error in getting data: ": err });
    }
}

const getBooksByBundleId = async (req, res) => {

    try {
        const getBooksByBundleId = await Bundle.findOne({ bundle_id: Number(req.params.bundle_id) });
        return res.json(getBooksByBundleId).status(200);

    } catch (err) {
        res.status(500).json({ "Error in getting data: ": err });
    }
}
const insertBundleData = async () => {
    try {
        // const data = fs.readFileSync("C:/Users/gayatri.kotla.TL233/Documents/VScode/MERN/BookBeacon/BookBeacon_backend/backend_initialization/data/data.json", 'utf8');

        const bundles = JSON.parse(data);

    } catch (error) {
        console.log("Error inserting data: ", error);
    }
}

const searchBundles = async (req, res) => {
    console.log("search ran")
    try {
        const bundleName = req.query.bundleName;

        if (!bundleName || bundleName.length <= 2) {
            return res.status(400).json({ error: 'Please provide a bundleName with more than 2 characters to search' });
        }

        const bundles = await Bundle.find({ bundle_Name: { $regex: bundleName, $options: 'i' } });

        res.status(200).json(bundles)
    } catch (error) {
        console.log("error during search :", error);
        res.status(500).json({ error: 'An error occured while searching for bundles' });

    }

}

module.exports = { getBundleBooks, getBooksByBundleId, searchBundles };