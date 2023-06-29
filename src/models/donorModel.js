const mongoose = require("mongoose");







const donorSchema = new mongoose.Schema({
    Donors: [
        {
            name: { type: String, required:true},
            userName: { type: String, required:true},
            amount: { type: Number, required:true},
            desc: { type: String , required:true},
            info: {type: String, required:true},
        }
    ]
}, { timestamps: true });

mongoose.models = {};
module.exports = mongoose.model("Donor", donorSchema);