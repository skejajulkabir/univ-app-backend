const mongoose = require("mongoose");

const sizeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
});

const variantProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  availableQty: { type: Number, required: true },
});

const variantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  products: { type: [variantProductSchema], required: true },
});

const reviewsSchema = new mongoose.Schema({
  Usersname: { type: String, required: true },
  stars: {type: Number, required: true},
  comment: {type: String, required: true},
});





const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  brand: { type: String, default: "No Brand" },
  slug: { type: String, required: true},
  description: { type: String, required: true },
  img: { type: String, default: "https://dummyimage.com/400x400" },
  category: { type: String, required: true },
  variants: { type: [variantSchema], required: true },
  size: { type: [sizeSchema], required: true, default: [] },
  color: { type: Array , default: []},
  price: { type: Number , required: true },
  availableQty: { type: Number, required: true },
  reviews : {type : [reviewsSchema]}
}, { timestamps: true });

mongoose.models = {};
module.exports = mongoose.model("Product", productSchema);