const mongoose = require("mongoose");

const schema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  sid: {
    type: String,
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
  status:{
    type:Number,//ถ้าเป็น Admin ให้เป็น 0 ก่อนยังล๊อกอินไม่ได้
    default:1
  }
});

const User = mongoose.model("User", schema);

module.exports = User;
