const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  author: {
    name: { type: String, required: true },
    image: { type: String },
    userName: { type: String, required: true },
    role: [{ type: String }],
  },
  caption : { type: String, required: true},
  typeOfThePost: { type: String, required: true },
  imgURL: { type: String },
  videoURL: { type: String },
  Likes: { type: [
    {
        name: { type: String },
        userName: { type: String }
    }
  ], required: true, default: [] },
  comments: [
    {
      img: { type: String },
      name: { type: String },
      userName: { type: String },
      comment: { type: String },
    },
  ],
}, { timestamps: true });

mongoose.models = {};
module.exports = mongoose.model("Post", postSchema);
