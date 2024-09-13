const { json } = require("body-parser");
const express = require("express");
const { parse } = require("path");
const bundleRoute = require("./routes/bundle.route");
const bundleBooksRoute = require("./routes/bundle.books");

const app = express();

app.use(json());

app.use("/", bundleRoute);
app.use("/", bundleBooksRoute);

app.listen("3000", () => console.log("running on 3000"));