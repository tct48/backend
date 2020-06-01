const mongoose = require("mongoose");

const schema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  sid: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  c_passwprd: {
    type: String,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  exp: {
    type: Number,
    default: 0,
  },
  badge: {
    type: Array,
  },
  guild:{
    type:String
  },
  role: {
    type: String,
    default: "student",
  },
  class: {
    type: String
  },
  // last login
  activity: {
    type: Date,
  },
  image: {
    type: String,
  },
});

const User = mongoose.model("User", schema);

module.exports = User;
