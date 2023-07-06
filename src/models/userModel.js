const mongoose = require("mongoose");







const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    userName: { type: String, required: true , unique: true },
    avatar: { type: String , default: "none" },
    regularEmail: { type: String, required: true , unique: true },
    password: { type: String, required: true },
    role: {type: String , default:'STUDENT'},
    awards: [{
        name:{type: String},
        givenBy:{type: String},
        description: {type:String},
    }],
    isVarified: {type:Boolean, default:false , required:true},
    
    userType: {type:String, default:"STUDENT"},
    info: {
        department : {type: String, required:true},
        roll : {type: Number, required:true , unique:true},
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
        univEmail: {type: String },
        Facebook: {type: String },
        LinkedIn: {type: String },
        insta: {type: String },
        YouTube: {type: String },
        Discord: {type: String },
    }
}, { timestamps: true });


userSchema.index({ 'userName': 1 , 'regularEmail' : 1}, { unique: true }); // Apply compound unique index
// userSchema.createIndexes();

mongoose.models = {};
module.exports = mongoose.model("User", userSchema);