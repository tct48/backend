const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const User = require('./api/routes/user/user');
const Attendence = require('./api/routes/user/attendence');
const Chapter = require('./api/routes/chapter/chapter');
const Guide = require('./api/routes/user/guide');
const Quiz = require('./api/routes/quiz/quiz');
const File = require('./api/routes/file/file');
const Exercise = require('./api/routes/exercise/exercise');
const Grade = require('./api/routes/grade/grade');
const Situation = require('./api/routes/quiz/situation');
const Guild = require('./api/routes/user/guild');
const Classroom = require('./api/routes/user/classroom');

// connect database
mongoose.connect(process.env.MONGODB_URI, {
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
app.use(cors({origin:"*"}));
app.use(bodyParser.json());

app.use(function (req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,PATCH");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
})

app.use("/user", User);
app.use("/attendence", Attendence);
app.use("/chapter",Chapter);
app.use("/quiz", Quiz);
app.use("/file", File);
app.use("/exercise", Exercise);
app.use("/grade", Grade);
app.use("/prps", Situation);
app.use("/classroom", Classroom);
app.use("/guild",Guild);
app.use("/guide",Guide);

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
