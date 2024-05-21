const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    cartlist: { type: Array, required: true },
    historycheckout: { type: Array, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", user);
