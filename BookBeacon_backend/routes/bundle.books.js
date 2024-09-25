const express = require("express");
const { getBundleBooks, getBooksByBundleId, insertBundleData, searchBundles } = require("../controller/bundle.books.controller");
const protect = require("../middleware/authMiddleware")
const bundleBooksRoute = express.Router();

bundleBooksRoute.get("/bundlebooks", protect, getBundleBooks);
bundleBooksRoute.get("/booksByBundleId/:bundle_id", protect, getBooksByBundleId);
bundleBooksRoute.get("/bundleSearch", searchBundles)

module.exports = bundleBooksRoute;