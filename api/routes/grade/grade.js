const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Grade = require("../../models/grade/grade");


// เรียกดูคะแนนทั้งหมดของนักศึกษา
router.get("/:_id", (req, res) => {
  const _id = req.params._id;
  Grade.findOne({ user: _id }).then(result => {
    res.status(200).json({
      item: result
    })
  });
});

// เรียกดูคะแนนของนักศึกษารายแบบฝึกหัด
router.get("/:_id/:ref", (req, res) => {
    const _id = req.params._id;
    const ref = req.params.ref;
    Grade.find({ user: _id,ref: ref }).then(result => {
      res.status(200).json({
        total_items: result.length,
        item: result
      })
    })
    .catch(err=>{
        res.status(404).json({
            message: err
        })
    })
    ;
  });

// เพิ่มแหล่งการเรียนรู้ test
router.post("/", (req, res, next) => {
  const grade = new Grade({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      score: req.body.score,
      ref: req.body.ref,
      user: req.body.user
  })

  grade.save().then((result) => {
    res.status(200).json({
      message: "เพิ่มคะแนนเรียบร้อยแล้ว!",
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

  Grade.update(
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
        message: "Grade is updated",
      });
    });
});

module.exports = router;
