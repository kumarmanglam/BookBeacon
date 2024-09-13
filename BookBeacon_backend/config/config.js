const { MongoClient } = require("mongodb");
const dbURl = "mongodb+srv://gayatrikotla333:40L7ipLL8vBUsFWN@cluster0.dsfvy.mongodb.net/"

async function dbConnection() {
    const client = new MongoClient(dbURl);
    await client.connect();
    return client.db("bookBeacon");
}

module.exports = dbConnection;