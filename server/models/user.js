const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({ 
    name: String 
})

module.exports = mongoose.model("User", userSchema)