const mongoose = require("mongoose");



const orderSchema = new mongoose.Schema({
    customer : {
        fullName : {type: String , required : true},
        admSession :{type: String },
        department :{type: String },
        email :{type: String , required : true},
        address :{type: String , required : true},
        phone :{type: Number , required : true},
        voucher :{type: String },
        utils : {type : Object , default : {}},
    },
    cart : {
        type : Array , required : true
    }
});

mongoose.models = {};
module.exports = mongoose.model("Order", orderSchema);