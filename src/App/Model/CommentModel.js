const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const comment = new Schema(
  {
    userID: { type: String, required: true },
    userName: { type: String, required: true },
    productID: { type: String, required: true },
    content: { type: String, required: true },
    rating: {
      type: Number,
      default: 0,
    },
    reply: Array,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("comment", comment);
