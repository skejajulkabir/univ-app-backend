const mongoose = require("mongoose");



const authorisedUsersSchema = new mongoose.Schema({
    name : {type : String, required: true , default: ""},
    userName : {type : String, required: true , default: ""},
    id : {type : String, required: true , default: ""},
    role : {type : Array, required: true , default : [] },
    permissions : {type : Array, required: true , default : [] }
});

mongoose.models = {};
module.exports = mongoose.model("authorisedUser", authorisedUsersSchema);