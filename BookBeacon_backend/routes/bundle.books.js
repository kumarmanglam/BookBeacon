const express = require("express");
const { getBundleBooks } = require("../controller/bundle.books.controller");

const bundleBooksRoute = express.Router();

bundleBooksRoute.get("/bundlebooks", getBundleBooks);

module.exports = bundleBooksRoute;