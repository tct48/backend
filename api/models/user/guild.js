const mongoose = require("mongoose");

const schema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {type:String,required:true},
  user: {type:Array}
});

const Guild = mongoose.model("Guild", schema);

module.exports = Guild;
