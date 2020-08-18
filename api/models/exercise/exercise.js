const mongoose = require("mongoose");

const schema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  role: {type: Number, required: true},
  type: {type: String, required: true},
  status: {type: String, required: true},
  created: { type: Date, required: true },
  view: {type: Boolean, default:true}
});

const Exercise = mongoose.model("Exercise", schema);

module.exports = Exercise;
