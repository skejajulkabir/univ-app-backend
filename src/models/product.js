const mongoose = require("mongoose");





const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: {
    name: { type: String, required: true },
    userName: { type: String, required: true }
  },
  brand: { type: String, default: "Dissolver" },
  slug: { type: String, required: true , unique: true },
  description: { type: String, required: true },
  img: { type: Array, default: ["https://dummyimage.com/400x400"] , required: true},
  category: { type: String, required: true },
  variants: { type: [
    {
      color: { type: String },
      image: { type: String },
      price: { type: Number },
    }
  ] 
},
  // size: { type: Array, required: true, default: [] },
  // color: { type: Array , default: []},
  price: { type: Number , required: true },
  // availableQty: { type: Number, required: true },
  reviews : {type : [
    {
      name: { type: String },
      userName: { type: String },
      stars: {type: Number },
      comment: {type: String },
    }
  ], default:[]},

}, { timestamps: true });

mongoose.models = {};
module.exports = mongoose.model("Product", productSchema);