const { User } = require("../models/user");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/auth");

const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(password)

    try {
        // console.log(email);
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ error: "Password is incorrect" });
        }
        const token = await generateToken(user.email);
        res.json({
            username: user.username,
            email: user.email,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
}

const createUser = async (req, res) => {
    try {
        const data = req.body;

        const existingUser = await User.findOne({ email: data.email }); // Adjust the field as necessary (e.g., username)

        if (existingUser) {
            return res.status(400).json({ message: "User already exists." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(data.password, salt);
        data.password = hashedPassword;
        const newUser = await new User(data);

        const result = await newUser.save();

        console.log(result);

        res.status(200).json("created user successfully");
    } catch (err) {
        console.log("error in creating user", err);
    }
}

module.exports = { createUser, login };