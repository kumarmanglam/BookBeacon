const express = require("express");
const { createUser, login } = require("../controller/user.controller")

const userRoute = express.Router();


userRoute.post("/user", createUser);
userRoute.post("/login", login);

module.exports = userRoute;