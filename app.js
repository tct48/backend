const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const User = require('./api/routes/user/user');

mongoose.connect(
  'mongodb://ketar:d10m12y37@ds015478.mlab.com:15478/heroku_wctv7cvf', {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })
  .then(() => {
    console.log("Connected to MongoDB..."); 
  })
  .catch(() => {
    console.log("Cann't connect MongoDB")
  })

mongoose.Promise = global.Promise;

// แสดงเวลาในการ GET POST ลงใน TERMINAL ด้านล่าง
app.use(morgan('dev'));
app.unsubscribe(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "https://backend-pblgps.herokuapp.com");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use(function (req, res, next){
  res.header("Access-Control-Allow-Origin", "https://backend-pblgps.herokuapp.com");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
})

app.use("/user", User);

// กรณีหา Route ไม่เจอ Set Error
app.use((req, res, next)=>{
  const error = new Error('Not found');
  error.status = 404;
  next(error);
})

// Response Error
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message_from_ketar: "Error",
      message : error.message
    }
  })
})

module.exports = app;
