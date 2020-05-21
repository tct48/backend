const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Chapter = require("../../models/chapter/chapter");
const Grade = require("../../models/grade/grade");

// เรียกดูข้อ ทั้งหมด ของ Chapter นั้น ๆ
router.get("/:_id", (req, res, next) => {
    const _id = req.params._id
    Grade.find({ ref: _id }).then((result) => {
    return res.status(200).json({
      total_items: result.choice.length,
      items: result
    });
  });
});

// เพิ่มแหล่งการเรียนรู้
router.post("/", (req, res, next) => {
  const grade = new Grade({
    _id : new mongoose.Types.ObjectId(),
    name: req.body.name,
    score: req.body.score,
    ref: req.body.ref,
    user: req.body.user,
  }) 

  grade.save().then(result=>{
    res.status(200).json({
      message: "บันทึกคะแนนลงในระบบเรียบร้อยแล้ว",
      data: result,
    });
  })
});

// ลบแหล่งการเรียนรู้
router.delete("/:_id", (req, res, next) => {
  const _id = req.params._id;
  Grade.remove({
    _id: _id,
  })
    .exec()
    .then(() => {
      res.status(200).json({
        message: "ลบรายการคะแนนเรียบร้อยแล้ว!",
      });
    });
});

// แก้ไขแหล่งการเรียนรู้
router.patch("/:_id", (req, res, next) => {
  const _id = req.params._id;

  Chapter.update(
    {
      _id: _id,
    },
    {
      $set: req.body,
    }
  )
    .exec()
    .then(() => {
      res.status(200).json({
        message: "Chapter is updated",
      });
    });
});

module.exports = router;
