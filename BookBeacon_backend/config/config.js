const { MongoClient } = require("mongodb");
const dbURL = "mongodb+srv://praneeth:praneeth@basicnodeconnect.x8dsf.mongodb.net/book_beacon?retryWrites=true&w=majority&appName=BasicNodeConnect"

const mongoose = require("mongoose");
async function dbConnection() {
    const client = new MongoClient(dbURl);
    await client.connect();
    console.log("db connection working")
    return client.db("bookBeacon");
}

function connectDb() {
    mongoose.connect(dbURL)
        .then(() => console.log("connected"))
        .catch(() => console.log("could not connect"));
}

module.exports = { connectDb };