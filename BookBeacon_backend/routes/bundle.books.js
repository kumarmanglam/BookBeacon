const express = require("express");
const { getBundleBooks, getBundleBooksById } = require("../controller/bundle.books.controller");

const bundleBooksRoute = express.Router();

bundleBooksRoute.get("/bundlebooks", getBundleBooks);
bundleBooksRoute.get("/bundlebooksById", getBundleBooksById);

module.exports = bundleBooksRoute;