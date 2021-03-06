const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Chapter = require("../../models/chapter/chapter");
const Quiz = require("../../models/quiz/quiz");
const { request } = require("express");

// เรียกดูข้อ ทั้งหมด ของ Chapter นั้น ๆ
router.get("/:_id", (req, res, next) => {
  const _id = req.params._id;
  console.log(_id)
  Quiz.findOne({ ref: _id }).then((result) => {
    return res.status(200).json({
      total_items: result.choice.length,
      items: result,
    });
  });
});

router.get("/quizId/:_id", (req, res, next) => {
  const _id = req.params._id;
  console.log(_id)
  Quiz.findOne({ _id: _id }).then((result) => {
    return res.status(200).json({
      total_items: result.choice.length,
      items: result,
    });
  });
});

router.get("/", (req, res, next) => {
  const quiz = Quiz.aggregate([{$project:{name:1}}]);

  quiz.then((result) => {
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
    name: req.body.name,
    detail: req.body.detail,
    choice: req.body.choice,
    ref: req.body.ref,
    limit_time : req.body.limit_time,
    created: new Date(),
  });

  quiz.save().then((result) => {
    res.status(200).json({
      message: "เพิ่มหน่วยการเรียนรู้เรียบร้อยแล้ว",
      data: result,
    });
  });
});

// ลบแหล่งการเรียนรู้
router.delete("/:_id", (req, res, next) => {
  const _id = req.params._id;
  Quiz.remove({
    _id: _id,
  })
    .exec()
    .then(() => {
      res.status(200).json({
        message: "Quiz is deleted",
      });
    });
});

// แก้ไขแหล่งการเรียนรู้
router.patch("/:_id", (req, res, next) => {
  const _id = req.params._id;

  Quiz.update(
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
