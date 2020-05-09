const mongoose = require('mongoose');

const schema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  sid: {
    type: String,
    required: true,
    unique: true
  }
});

const File = mongoose.model('File', schema);

module.exports = File
