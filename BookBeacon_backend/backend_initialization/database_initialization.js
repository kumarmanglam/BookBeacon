


const data = require("./data/data.json");
const bundles = require("./data/bundles.json");
const dbConnection = require("../config/config");
async function initializeBundleBooks() {
    try {
        let dbconnect = await dbConnection();
        const collection = dbconnect.collection("bundle_books");
        const response = await collection.insertMany(data);
    } catch (err) {
        console.log("Error: ", err);
    } finally {
        await client.close();
    }
}
// setData();

async function initializeBundles() {
    try {
        const dbconnect = await dbConnection();
        const collection = dbconnect.collection("bundles");
        const response = await collection.insertMany(bundles);
    } catch (err) {
        console.log("Error: ", err);
    } finally {
        await client.close();
    }
}
// initializeBundles(); 