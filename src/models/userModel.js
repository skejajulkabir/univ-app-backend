const mongoose = require("mongoose");







const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    userName: { type: String, required: true , unique: true },
    avatar: { type: String , default: "/utils/defaultDP.jpg" },
    regularEmail: { type: String, required: true , unique: true },
    password: { type: String, required: true , select : false },
    role: {type: Array , default:['STUDENT']},
    permissions: {type: Array , default:[]},
    awards: [{
        name:{type: String},
        givenBy:{type: String},
        description: {type:String},
    }],
    isVarified: {type:Boolean, default:false , required:true},
    userType: {type:String, default:"STUDENT"},
    info: {
        bloodGroup : {type: String},
        department : {type: String, required:true},
        roll : {type: Number, required:true },
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




// Define an index to enable efficient searching
userSchema.index(
    {
      name: "text",
      userName: "text",
      "info.bloodGroup": "text",
      "info.department": "text",
      "info.roll": "text",
      "info.admissionSession": "text",
      "info.from": "text",
      "info.currentLocation": "text",
    },
    {
      name: "user_search_index",
      weights: {
        // You can adjust the weights to give priority to certain fields
        name: 10,
        userName: 5,
        "info.bloodGroup": 1,
        "info.department": 1,
        "info.roll": 1,
        "info.admissionSession": 1,
        "info.from": 1,
        "info.currentLocation": 1,
      },
    }
  );


userSchema.index({ 'userName': 1 , 'regularEmail' : 1}, { unique: true }); // Apply compound unique index
// userSchema.createIndexes();


mongoose.models = {};
module.exports = mongoose.model("User", userSchema);