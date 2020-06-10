const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const upload = multer({
  dest: "uploads/image/user/"
});
const nodemailer = require("nodemailer");
var nodeoutlook = require('nodejs-nodemailer-outlook')

const transporter = nodemailer.createTransport({
  host: "https://backend-pblgps.herokuapp.com",
  secureConnection: false,
  port: 25,
  tls: {
    ciphers: "SSLv3",
  },
  service: "hotmail",
  auth: {
    user: "tar_solo@outlook.co.th",
    pass: "d10m12y37",
  },
});

var cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "hgflnfcwf",
  api_key: "686937983637647",
  api_secret: "8pkrtmO7kPQvre9o5wjOQopo-8A",
});

const User = require("../../models/user/user");

var accessToken = null;

// สมาชิกทั้งหมด
router.get("/", (req, res, next) => {
  if (!req.query["sp"] || !req.query["lp"]) {
    res.status(200).json({
      code: "Error !",
      message: "Missing request query parameter",
    });
  }

  var sp = Object.values(req.query["sp"]);
  var lp = Object.values(req.query["lp"]);
  var skip = sp * lp;

  const user = User.find({
    role: "student"
  }).sort({
    firstname: 0
  });

  user.then((result) => {
    const totalItem = result.length;
    user
      .skip(Number(skip))
      .limit(Number(lp))
      .then((items) => {
        return res.status(200).json({
          total_items: totalItem,
          items: items,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: err.message,
        });
      });
  });
});

// ค้นหา by ID
router.get("/userid/:_id", (req, res, next) => {
  const _id = req.params._id;
  User.find({
    _id: _id
  })
  .then((items) => {
    return res.status(200).json({
      total_items: items.length,
      items: items,
    });
  });
});

// ค้นหา
router.get("/search", (req, res, next) => {
  if (!req.query["sp"] || !req.query["lp"]) {
    res.status(200).json({
      code: "Error !",
      message: "Missing request query parameter",
    });
  }

  var sp = Object.values(req.query["sp"]);
  var lp = Object.values(req.query["lp"]);
  var skip = sp * lp;

  var valueData = Object.values(req.query)[2];

  var role="student";

  if(Object.values(req.query)[3]=="admin"){
    role="admin"
  }

  const user = User.find({
    $or: [{
        firstname: {
          $regex: valueData,
          $options: "ig",
        },
      },
      {
        lastname: {
          $regex: valueData,
          $options: "ig",
        },
      },
      {
        username: {
          $regex: valueData,
          $options: "ig",
        },
      },
    ],
    role: role,
  }).sort({
    firstname: 0
  });

  user
    .skip(Number(skip))
    .limit(Number(lp))
    .then((items) => {
      return res.status(200).json({
        total_items: items.length,
        items: items,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
});

// leaderboard only student
router.get("/leaderboard", (req, res, next) => {
  User.find({
      role: "student"
    })
    .select("username exp badge")
    .limit(5)
    .sort({
      exp: -1
    })
    .then((items) => {
      return res.status(200).json({
        total_items: items.length,
        items: items,
      });
    });
});

// การล๊อกอิน
router.post("/login", (req, res, next) => {
  User.find({
      username: req.body.username,
    })
    .exec()
    .then((user) => {
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "อีเมล์ หรือพาสเวิร์ดไม่ถูกต้อง",
          });
        }

        User.update({
            _id: user[0]._id,
          }, {
            activity: new Date(),
          })
          .exec()
          .then(() => {});

        if (result) {
          const token = jwt.sign({
              username: user[0].username,
              userId: user[0]._id,
            },
            process.env.JWT_KEY, {
              expiresIn: "24h",
            }
          );
          accessToken = token;
          return res.status(200).json({
            message: "Auth successful",
            _id: user[0]._id,
            accessToken: token,
          });
        }

        res.status(401).json({
          message: "อีเมล์ หรือพาสเวิร์ดไม่ถูกต้อง",
        });
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
});

// getUserLogin
router.get("/data", (req, res, next) => {
  jwt.verify(accessToken, process.env.JWT_KEY, function (error, decodedToken) {
    const userId = decodedToken.userId;
    return User.findById({
        _id: userId,
      })
      .populate("academy")
      .then((UserLogin) => {
        return res.status(200).json(UserLogin);
      });
  });
});

// การสมัครสมาชิก
router.post("/signup", upload.single("file"), (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }
    var user;

    console.log(req.body)

    user = new User({
      _id: new mongoose.Types.ObjectId(),
      email: req.body.email,
      sid: req.body.sid,
      password: hash,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      phone: req.body.phone,
      class: req.body.class,
      role: req.body.role
    });

    if (req.body.image) {
      user = new User({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        sid: req.body.sid,
        password: hash,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        phone: req.body.phone,
        image: req.body.image,
        class: req.body.class
      });
    }

    user
      .save()
      .then((result) => {
        res.status(200).json({
          message: "สมัครสมาชิกเรียบร้อยแล้ว",
          created: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: err,
        });
      });
  });
});

// การอัพโหลดภาพขึ้น cloudinary
router.post("/uploadImage", upload.single("file"), (req, res, next) => {
  var data;
  data = req.file.destination + req.file.filename;
  console.log(req.file);
  cloudinary.v2.uploader.upload(
    data, {
      unique_filename: true,
      folder: "user/image/",
    },
    function (error, result) {
      if (error) {
        console.log("*** Error ***");
        return res.status(200).json({
          code: "error",
          message: error,
        });
      }
      if (result) {
        console.log("*** Upload ***");
        return res.status(200).json({
          public_id: result.public_id,
        });
      }
    }
  );
});

// แก้ไขสมาชิก
router.patch("/:_id", (req, res, next) => {
  const _id = req.params._id;

  User.update({
      _id: _id,
    }, {
      $set: req.body,
    })
    .exec()
    .then(() => {
      res.status(200).json({
        message: "แก้ไขข้อมูลสำเร็จ",
      });
    });
});

// การเพิ่ม exp
router.patch("/exp/:_id", (req, res, next)=> {
  const _id = req.params._id;
  const obtainExp = req.body.exp;

  User.findOneAndUpdate({
    _id: _id
  },{
    $inc:{exp:obtainExp}
  })
  .exec()
  .then(()=>{
    res.status(200).json({
      message: "คุณได้รับ Exp เพิ่มขึ้น " + obtainExp + " Exp"
    })
  })
})

// ลบข้อมูลสมาชิก
router.delete("/:_id", (req, res, next) => {
  const _id = req.params._id;
  User.remove({
      _id: _id,
    })
    .exec()
    .then(() => {
      res.status(200).json({
        message: "User is deleted",
      });
    });
});

// แก้ไขรหัสผ่าน
router.post("/changePassword", (req, res, next) => {
  var username = req.body.username;
  var old_password = req.body.old_password;
  var new_password = req.body.new_password;

  User.find({
      username: username
    })
    .then((user) => {
      if (user.length == 0) {
        return res.status(500).json({
          message: "Your username cannot be found in the system.",
        });
      }
      const userId = user[0]._id;
      const password_in_db = user[0].password;
      // console.log(user);
      bcrypt.compare(old_password, password_in_db, (err, result)=>{
        if(err){
          return res.status(500).json({
            message:"รหัสผ่านเดิมไม่ถูกต้อง +"
          });
        }
        
        bcrypt.hash(new_password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          }
          User.update({
            _id:userId
          }, {
            password: hash
          })
          .exec()
          .then(res.status(200).json({
            message: "แก้ไขรหัสผ่านเรียบร้อยแล้ว!"
          }))
        })
      })
    });
});

module.exports = router;