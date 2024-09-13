const express = require("express");
const { getBundles } = require("../controller/bundle.controller");
const bundleRoute = express.Router();

bundleRoute.get("/bundles", getBundles);

module.exports = bundleRoute;