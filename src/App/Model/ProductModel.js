const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const product = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    shortDescription: { type: String, required: true },
    detailDescription: { type: String, required: true },
    ingredients: { type: String, required: true },
    instructions: { type: String, required: true },
    videoId: { type: String },
    price: { type: Number, required: true },
    attachment: { type: String },
    likeCount: { type: Number, default: 0 },
    isNew: { type: Boolean, default: false },
    createdAt: { type: Date, default: new Date() },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("product", product);
