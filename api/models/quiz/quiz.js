const mongoose = require("mongoose");

const schema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  question: { type: String, required: true },
  choice: {type: Object, required: true},
  type: { type: String },
  ref: { type: String }
});

const Quiz = mongoose.model("Quiz", schema);

module.exports = Quiz;
