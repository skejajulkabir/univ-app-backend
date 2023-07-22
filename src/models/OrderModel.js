const mongoose = require("mongoose");



const orderSchema = new mongoose.Schema({
    customer : {
        type : Object , required : true
    },
    cart : {
        type : Array , required : true
    }
});

mongoose.models = {};
module.exports = mongoose.model("Order", orderSchema);