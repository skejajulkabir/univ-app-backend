const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customer: {
    fullName: { type: String, required: true },
    id: { type: String },
    admSession: { type: String },
    department: { type: String },
    email: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: Number, required: true },
    voucher: { type: String },
    utils: { type: Object, default: {} },
  },
  cart: [
    {
        name : { type: String, required: true , default : "not available"},
        qty : { type: Number, required: true , default : "not available"},
        id : { type: String, required: true , default : "not available"},
        color : { type : String, required: true , default : "not available"},
        price : { type: Number, required: true , default : "not available"},
        image : { type: String, required: true , default : "not available"},
        size : { type : String, required: true , default : "not available"},
        status : { type: String, required: true ,  default : 'pending' },
    }
  ],
  status: { type: String, required: true, default: "NEW_ORDER" },
  totalOrderValue: { type: Number },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

mongoose.models = {};
module.exports = mongoose.model("Order", orderSchema);
