const jwt = require("jsonwebtoken");

const generateToken = (email) => {
    return jwt.sign({ email }, "helloworld", { expiresIn: "30d" });
};

module.exports = { generateToken };