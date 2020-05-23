const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Attendence = require("../../models/user/attendence");
const PrPs = require("../../models/quiz/situation");

// เพิ่มแบบทดสอบ
router.post("/", (req, res, next) => {
  const prps = new PrPs({
    _id: new mongoose.Types.ObjectId(),
    ref: req.body.ref, //class
    created: new Date(),
    situation: req.body.situation,
    choice: req.body.choice,
  });

  prps.save().then((result) => {
    res.status(200).json({
      message: "สร้างแบบประเมินทักษะการแก้ปัญหาสำเร็จ !",
      item: result,
    });
  });
});

// เรียกทำแบบทดสอบกี่ข้ออะไรบ้าง
router.get("/:id", (req, res, next) => {
  const _id = req.params.id;
  PrPs.find({
    _id: _id,
  }).then((result) => {
    return res.status(200).json({
      total_items: result.length,
      items: result,
    });
  });
});

// ลบข้อมูลเข้าเรียน
router.delete("/:_id", (req, res, next) => {
  const _id = req.params._id;
  PrPs.remove({
    _id: _id,
  })
    .exec()
    .then(() => {
      res.status(200).json({
        message: "PrPs is deleted",
      });
    });
});

module.exports = router;
