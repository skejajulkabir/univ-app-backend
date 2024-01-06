const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema(
  {
    name: { type: String },
    identity: { type: String },
    img: { type: String },
    phone: { type: String },
    email: { type: String, default: "" },
    address: { type: String },
    desc: { type: String },
    amount: { type: Number },
    isPaid: { type: Boolean, default: false },
    isAmountPublic: { type: Boolean, default: true }
  },
  { timestamps: true }
);

mongoose.models = {};
module.exports = mongoose.model("Donor", donorSchema);
