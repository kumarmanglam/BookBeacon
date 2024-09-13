const dbConnection = require("../config/config");

const getBundles = async (req, res) => {
    try {

        const connection = await dbConnection();

        const bundleCollection = await connection.collection("bundles");

        const bundles = await bundleCollection.find().toArray();

        return res.json(bundles).status(200);
    } catch (err) {
        res.status(500).send("Error in getting data: ", err);
    }
}
module.exports = { getBundles };