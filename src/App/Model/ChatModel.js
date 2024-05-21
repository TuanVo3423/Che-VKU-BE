const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chat = new Schema(
  {
    userID: { type: String, required: true },
    userName: { type: String, required: true },
    content: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("chat", chat);
