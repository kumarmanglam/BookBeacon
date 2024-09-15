const express = require("express");
const { getBundles, getBundleById } = require("../controller/bundle.controller");
const bundleRoute = express.Router();

bundleRoute.get("/bundles", getBundles);
bundleRoute.get("/bundle", getBundleById);

module.exports = bundleRoute;