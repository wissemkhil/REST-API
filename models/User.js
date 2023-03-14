const mongoose = require("mongoose");
// Schema

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
  },
});
// Model
users = mongoose.model("users", userSchema);
module.exports = users;