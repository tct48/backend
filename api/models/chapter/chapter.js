const mongoose = require("mongoose");

const schema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  pdf: {type: Object, required: true},
  youtube: {type: Object, required: true},
  hypertext: {type: Object, required: true},
  quiz: {type:Number},
  created: {type : Date},
  purpose: {type :String},
  learning: {type:String},
  view: {type: Boolean, default:true}
});

const Chapter = mongoose.model("Chapter", schema);

module.exports = Chapter;
