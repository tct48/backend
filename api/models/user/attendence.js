const mongoose = require('mongoose');

const schema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  ref: { //2563
    type: String,
    required: true,
  },
  date: {
    type:Date,
    required:true
  },
  created: {
    type: Date,
    required: true,
  },
  status:{
      type:Number,
      required:true,
  },
  rate_time:{
    type:Array,
  },
  sick:{
      type:Array,
  },
  user:{
      type:Array
  }
});

const Attendence = mongoose.model('Attendence', schema);

module.exports = Attendence
