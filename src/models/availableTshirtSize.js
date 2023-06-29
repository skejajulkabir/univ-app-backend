const mongoose = require("mongoose");







const availableTshirtSizeSchema = new mongoose.Schema({
    availableSizes:[
        {
            size: {type: String, required: true},
            Quantity: {type: Number, required: true},
        }
    ]
}, { timestamps: true });

mongoose.models = {};
module.exports = mongoose.model("availableTshirtSize", availableTshirtSizeSchema);