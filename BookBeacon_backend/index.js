const { json } = require("body-parser");
const express = require("express");
const bundleRoute = require("./routes/bundle.route");
const bundleBooksRoute = require("./routes/bundle.books");
const licenseRoute = require("./routes/license");

const app = express();

app.use(json());

app.use("/", bundleRoute);
app.use("/", bundleBooksRoute);
app.use("/", licenseRoute);

app.listen("3000", () => console.log("running on 3000"));