const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category"
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "Owner"
  },
  title: { type: String, unique: false, required: true },
  description: { type: String, unique: false, required: true },
  photo: { type: String, unique: false, required: false },
  photoMeta: [],
  price: { type: Number, unique: false, required: true },
  stockQuantity: { type: Number, unique: false, required: true },
  rating: [Number]
});

module.exports = mongoose.model("Product", ProductSchema);
