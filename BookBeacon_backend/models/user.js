const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    _user_id: Number,
    first_name: String,
    second_name: String,
    email: String,
    password: String
})

const User = mongoose.model('User', userSchema);

module.exports = { User };