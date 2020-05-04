const mongoose = require('mongoose');

const schema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  sid: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  exp: {
    type: Number,
    default: 0
  },
  badge: {
    type: Array
  }
});

const User = mongoose.model('User', schema);

module.exports = User
