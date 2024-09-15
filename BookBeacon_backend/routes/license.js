const express = require("express");
const { createLicense, getLicenseById } = require("../controller/license.controller")

const licenseRoute = express.Router();

licenseRoute.post("/license", createLicense);
licenseRoute.get("/license", getLicenseById);

module.exports = licenseRoute;