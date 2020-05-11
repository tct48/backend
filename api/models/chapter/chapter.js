const mongoose = require("mongoose");

const schema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  title: {type: Object, required: true},
  text: {type: Object, required: true},
  url: {type: Object, required: true},
  quiz: { type: Number, default: 0},
  created: { type: Date, required: true },
});

const Chapter = mongoose.model("Chapter", schema);

module.exports = Chapter;
