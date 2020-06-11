const mongoose = require("mongoose");

const schema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {type:String,required:true},
  url: {type:String}
});

const Guide = mongoose.model("Guide", schema);

module.exports = Guide;
