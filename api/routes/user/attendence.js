const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Attendence = require("../../models/user/attendence");

// สมาชิกทั้งหมด
router.post("/", (req, res, next) => {
  const attendence = new Attendence({
    _id: new mongoose.Types.ObjectId(),
    date: req.body.date,
    ref: req.body.ref, //class
    created: new Date(),
    status: req.body.status,
    user: req.body.user,
  });

  attendence.save().then((result) => {
    res.status(200).json({
      message: "สร้างห้องเรียนเรียบร้อยแล้ว !",
      item: result,
    });
  });
});

// แสดงตารางวันที่เข้าเรียนทั้งหมดส่งปีการศึกษามาด้วย
router.get("/", (req, res, next) => {
  var ref = req.query["ref"];
  var total_items;

  const attendence = Attendence.find({
    ref: ref,
  }).sort({
    date: 0,
  });

  attendence.then((result) => {
    total_items = result.length;
    attendence
      .then((item) => {
        return res.status(200).json({
          total_items: item.length,
          items: item,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          message: err.message,
        });
      });
  });
});

// ดูรายคนว่าเด็กคนนี้มาเข้าเรียนกี่ครั้ง
router.get("/:user", (req, res, next) => {
  const _id = req.params.user;
  Attendence.find({
    user: { $elemMatch: { $eq: _id } },
  }).then((result) => {
    return res.status(200).json({
      total_items: result.length,
      items: result,
    });
  });
});

// นักเรียนลงชื่อเข้าเรียน
router.patch("/:_id", (req, res, next) => {
  const _id = req.params._id;
  const user = req.body.user;

  Attendence.find({
    _id: _id,
    user: { $elemMatch: { $eq: user } },
  }).then((result) => {
    if (result.length > 0) {
      return res.status(200).json({
        code: "500",
        message: "มึงมาเรียนแล้ว",
      });
    }

    Attendence.update(
      {
        _id: _id,
      },
      {
        $push: { user: user },
      }
    )
      .exec()
      .then(() => {
        res.status(200).json({
          message: "ลงชื่อเข้าเรียนสำเร็จ",
        });
      });
  });
});

// แก้สถานะการเข้าห้องเรียน
router.patch("/switch/:_id", (req, res, next) => {
  const _id = req.params._id;

  Attendence.update(
    {
      _id: _id,
    },
    {
      status: req.body.status,
    }
  )
    .exec()
    .then(() => {
      res.status(200).json({
        message: "แก้ไขข้อมูลสำเร็จ",
      });
    });
});

// ลบข้อมูลเข้าเรียน
router.delete("/:_id", (req, res, next) => {
  const _id = req.params._id;
  Attendence.remove({
    _id: _id,
  })
    .exec()
    .then(() => {
      res.status(200).json({
        message: "Attendence is deleted",
      });
    });
});

module.exports = router;
