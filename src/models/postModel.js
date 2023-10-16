const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  caption : { type: String, required: true},
  typeOfThePost: { type: String, required: true },
  imgURL: { type: String },
  videoURL: { type: String },
  likes: [{
    id: { type: String },
    name: { type: String },
    userName: { type: String }
  }],
  comments: [
    {
      commenter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      comment: { type: String },
    },
  ],
  postType : {type : String , default : "FEED_POST"} //? this can be FEED_POST , NOTICE_POST , BLOOD_DONATION_POST
}, { timestamps: true });

mongoose.models = {};
module.exports = mongoose.model("Post", postSchema);
