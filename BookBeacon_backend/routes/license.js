const express = require("express");
const { createLicense, getLicenseById, getLicenses, bulkUpdateLicense, UpdateBookConcurrencyInLicense } = require("../controller/license.controller")
const protect = require("../middleware/authMiddleware")

const licenseRoute = express.Router();

licenseRoute.post("/license", protect, createLicense);
licenseRoute.get("/license/:license_id", protect, getLicenseById);
licenseRoute.get("/licenses", protect, getLicenses);
licenseRoute.put("/bulkConcurrencyUpdateInLicense", protect, bulkUpdateLicense);
licenseRoute.put("/updateBookConcurrencyInLicense", protect, UpdateBookConcurrencyInLicense);
module.exports = licenseRoute;