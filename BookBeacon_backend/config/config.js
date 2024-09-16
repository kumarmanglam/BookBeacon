const { MongoClient } = require("mongodb");
const dbURl = "mongodb+srv://gayatrikotla333:40L7ipLL8vBUsFWN@cluster0.dsfvy.mongodb.net/"

async function dbConnection() {
    const client = new MongoClient(dbURl);
    await client.connect();
    console.log("db connection working")
    return client.db("bookBeacon");
}

const mongoose = require("mongoose");
async function connectDb() {
    await mongoose.connect(dbURl + "bookBeacon")
        .then(() => console.log("connected"))
        .catch(() => console.log("could not connect"));
}

module.exports = { dbConnection, connectDb };