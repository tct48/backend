const mongoose = require("mongoose");

const schema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  situation: { type: Array, required: true },
  question: { type: Object, required: true },
  ref: { type: String },
  created: { type: Date, required: true },
});

const PrPs = mongoose.model("PrPs", schema);

module.exports = PrPs;
