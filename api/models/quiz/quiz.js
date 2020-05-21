const mongoose = require("mongoose");

const schema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {type : String },
  detail: {type : String},
  choice : { type: Object, required: true },
  // answer -> _id, name ,score ,type
  ref: { type: String },
  created : {type :Date}
});

const Quiz = mongoose.model("Quiz", schema);

module.exports = Quiz;
