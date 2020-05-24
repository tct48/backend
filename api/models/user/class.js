const mongoose = require("mongoose");

const schema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const Classroom = mongoose.model("Class", schema);

module.exports = Classroom;
