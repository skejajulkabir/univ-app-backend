const mongoose = require("mongoose");







const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    userName: { type: String, required: true , unique: true },
    avatar: { type: String, required: true },
    email: { type: String, required: true },
    role: {type: Array , default:['rugularUser']},
    awards: [{
        givenBy:{type: String},
        description: {type:String},
    }],
    userType: {type:Array, default:['student']},
    info: {
        department : {type: String, required:true},
        roll : {type: Number, required:true},
        admissionSession : {type: String, required:true},
        currentLocation : {type: String, required:true},
        Gender : {type: String, required:true},
        from : {type: String, required:true},
    },
    contact: {
        phoneNumber: {
            Number: {type: Number, required:true},
            isPublic: {type: Boolean, required:true, default:false},
        },
        email: {type: String, required:true},
        Facebook: {type: String },
        LinkedIn: {type: String },
        insta: {type: String },
        YouTube: {type: String },
        Discord: {type: String },
        WhatsApp: {type: String }
    }
}, { timestamps: true });

mongoose.models = {};
module.exports = mongoose.model("User", userSchema);