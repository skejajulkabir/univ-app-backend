const mongoose = require("mongoose");



const availableTshirtSizeSchema = new mongoose.Schema({
    name : {type: String, required: true},
    data : [
        {
            size : {type : String , required: true},
            quantity : {type : String , required: true}
        }
    ]
});

mongoose.models = {};
module.exports = mongoose.model("AvailableTshirtSize", availableTshirtSizeSchema);