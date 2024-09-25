const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

const protect = async (req, res, next) => {
    let token;
    console.log("inside protect");
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];

            //verify token
            const decodeToken = jwt.verify(token, "helloworld");

            // console.log(decodeToken.email);
            const email = decodeToken.email;
            //get user from token
            const user = await User.findOne({ email });
            // console.log("user :", user);
            req.user = user;
            next();
        } catch (error) {
            res.status(401);
        }
    }
    else { }
};

module.exports = protect;