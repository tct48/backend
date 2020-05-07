const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Chapter = require("../../models/chapter/chapter");
const Quiz = require("../../models/quiz/quiz");

// เรียกดูข้อ ทั้งหมด ของ Chapter นั้น ๆ
router.get("/:_id", (req, res, next) => {
    const _id = req.params._id
    Quiz.find({ ref: _id }).then((result) => {
    return res.status(200).json({
      total_items: result.length,
      items: result,
    });
  });
});

// เพิ่มแหล่งการเรียนรู้
router.post("/", (req, res, next) => {
  const quiz = new Quiz({
    _id: new mongoose.Types.ObjectId(),
    question: req.body.question,
    choice: req.body.choice,
    type: req.body.type,
    ref: req.body.ref,
  });

  quiz.save().then((result) => {
    res.status(200).json({
      message: "เพิ่มหน่วยการเรียนรู้เรียบร้อยแล้ว",
      created: result,
    });
  });
});

// ลบแหล่งการเรียนรู้
router.delete("/:_id", (req, res, next) => {
  const _id = req.params._id;
  Chapter.remove({
    _id: _id,
  })
    .exec()
    .then(() => {
      res.status(200).json({
        message: "Chapter is deleted",
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
