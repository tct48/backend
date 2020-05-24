const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const PrPs = require("../../models/quiz/situation");
const Classroom = require("../../models/user/class");
const User = require("../../models/user/user");

// เพิ่มห้องเรียน
router.post("/", (req, res, next) => {
  const classroom = new Classroom({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name
  })

  classroom.save().then((result)=>{
      res.status(200).json({
          message: "เพิ่มชั้นเรียนเรียบร้อยแล้ว !",
          item: result
      })
  })
});

// หาชั้นเรียนทั้งหมด
router.get("/", (req, res, next) => {
    var sp = req.query["sp"];
    var lp = req.query["lp"];

    var skip = sp * lp;
    var total_items;
  
    const classroom = Classroom.find({
      
    })
    .sort({
      created: 0,
    });
  
    classroom.then((result) => {
      total_items = result.length;
      classroom
        .skip(Number(skip))
        .limit(Number(lp))
        .then((item) => {
          return res.status(200).json({
            total_items: item.length,
            items: item,
          });
        })
        .catch(err=>{
            return res.status(500).json({
                message:err.message
            })
        })
    });
  });

// return นักเรียนในห้องนี้ทั้งหมด
router.get("/student/:classroom", (req, res, next)=> {
    const classroom = req.params.classroom;
    console.log(classroom);
    const user = User.find({
        class:classroom
    })
    user.then(result=>{
        return res.status(200).json({
            total_items: result.length,
            items: result
        })
    })
})

// return ชั้นเรียนห้องเดียว
router.get("/:_id", (req, res, next) => {
    const _id = req.params._id;

    const classroom = Classroom.findOne({
        _id: _id
    })
    .select('name')
    .then(result=>{
        return(res.status(200).json({
            items: result
        }))
    })
})

// ลบข้อมูลเข้าเรียน
router.delete("/:_id", (req, res, next) => {
  const _id = req.params._id;
  PrPs.remove({
    _id: _id,
  })
    .exec()
    .then(() => {
      res.status(200).json({
        message: "ลบชั้นเรียนเรียบร้อยแล้ว !",
      });
    });
});

module.exports = router;
