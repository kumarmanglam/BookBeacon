const { json } = require("body-parser");
const express = require("express");
const dbURL = "mongodb+srv://praneeth:praneeth@basicnodeconnect.x8dsf.mongodb.net/book_beacon?retryWrites=true&w=majority&appName=BasicNodeConnect"

const mongoose = require("mongoose");
const bundleBooksRoute = require("./routes/bundle.books");
const licenseRoute = require("./routes/license");
const userRoute = require("./routes/user.route");
const { connectDb } = require("./config/config");
const cors = require("cors");
const app = express();

mongoose.connect(dbURL)
    .then(() => console.log("connected"))
    .catch(() => console.log("could not connect"));

app.use(json());
app.use(cors());

app.use("/", bundleBooksRoute);
app.use("/", licenseRoute);
app.use("/", userRoute)

app.listen("3000", () => console.log("running on 3000"));