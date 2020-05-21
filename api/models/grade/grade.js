const mongoose = require("mongoose");

const schema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  score: { type: Number, required: true },
  ref: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Grade = mongoose.model("Grade", schema);

module.exports = Grade;
