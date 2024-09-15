const { ObjectId } = require("mongodb");
const { dbConnection } = require("../config/config");



const getBundles = async (req, res) => {
    try {
        const connection = await dbConnection();

        const bundleCollection = await connection.collection("bundles");

        const bundles = await bundleCollection.find().toArray();

        res.json(bundles).status(200);
    } catch (err) {
        res.status(500).json({ "Error in getting data: ": err });
    }
}
const getBundleById = async (req, res) => {
    try {
        console.log("wroigd");
        const connection = await dbConnection();
        console.log(req.query);
        const bundleCollection = await connection.collection("bundles");

        const bundle = await bundleCollection.findOne({ bundle_id: parseInt(req.query.bundle_id) });
        console.log(bundle);
        res.json(bundle).status(200);
    } catch (err) {
        res.status(500).json({ "Error in getting data: ": err });
    }
}
module.exports = { getBundles, getBundleById };