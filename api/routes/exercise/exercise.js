const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Excercise = require("../../models/exercise/exercise");

const Quiz = require("../../models/quiz/quiz");

router.get("", (req, res, next)=>{
    if (!req.query["sp"] || !req.query["lp"]) {
        res.status(200).json({
          code: "Error !",
          message: "Missing request query parameter",
        });
      }
    
      var sp = Object.values(req.query["sp"]);
      var lp = Object.values(req.query["lp"]);
      var skip = sp * lp;
    
      const exercise = Excercise.find({}).sort({ name: 0 });
    
      exercise.then((result) => {
        const totalItem = result.length;
        exercise
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
})


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
    const exercise = new Excercise({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        role: req.body.role,
        type: req.body.type,
        status: req.body.status,
        created: new Date
    });

    exercise.save().then(result => {
        res.status(200).json({
            message: "เพิ่มข้อมูลแบบฝึกหัดเรียบร้อยแล้ว",
            created: result
        })
    })
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
