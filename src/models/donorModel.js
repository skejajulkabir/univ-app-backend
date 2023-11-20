const mongoose = require("mongoose");







const donorSchema = new mongoose.Schema({
    Donors: [
        {
            name: { type: String },
            img: { type: String },
            userName: { type: String },
            amount: { type: Number },
            isAmountPublic: { type: Boolean },
            desc: { type: String  },
            info: {type: String },
        }
    ]
}, { timestamps: true });

mongoose.models = {};
module.exports = mongoose.model("Donor", donorSchema);