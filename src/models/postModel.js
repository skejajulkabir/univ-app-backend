const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  author: {
    name: { type: String, required: true },
    image: { type: String },
    userName: { type: String, required: true },
    role: [{ type: String }],
    id : { type: String},
  },
  caption : { type: String, required: true},
  postCategory : { type: String, required: true , default : "FEED"},
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
      userId: { type: String },
      img: { type: String },
      name: { type: String },
      userName: { type: String },
      comment: { type: String },
    },
  ],
}, { timestamps: true });

mongoose.models = {};
module.exports = mongoose.model("Post", postSchema);
