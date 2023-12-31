const mongoose = require("mongoose");





const websiteUtilsSchema = new mongoose.Schema({
  isStoreOpen: { type: Boolean , required: true , default : false },
}, { timestamps: false });



mongoose.models = {};
module.exports = mongoose.model("Product", websiteUtilsSchema);