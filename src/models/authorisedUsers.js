const mongoose = require("mongoose");



const authorisedUsersSchema = new mongoose.Schema({
    name : {type : String, required: true},
    id : {type : Number, required: true},
    role : {type : String, required: true}
});

mongoose.models = {};
module.exports = mongoose.model("authorisedUser", authorisedUsersSchema);