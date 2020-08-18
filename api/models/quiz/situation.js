const mongoose = require("mongoose");

const schema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  situation: { type: String, required: true },
  questions: { type: Array, required: true },
  answers: { type: Object, required: true },
  created: { type: Date, required: true },
  ref: { type : String, required:true},
  view: {type: Boolean, default:true}
});

const PrPs = mongoose.model("PrPs", schema);

module.exports = PrPs;
