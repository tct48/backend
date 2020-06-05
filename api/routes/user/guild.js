const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Guild = require("../../models/user/guild");
const User = require("../../models/user/user");

// สร้าง Guild
router.post("/", (req, res, next) => {
  const guild = new Guild({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    user: req.body.user,
  });

  guild.save().then((result) => {
    res.status(200).json({
      message: "ก่อตั้งกิล์ดสำเร็จ !",
      item: result,
    });
  });
});

router.get("/:userId", (req,res ,next)=>{
  const _id = req.params.userId;

  User.findOne({
    _id: _id,
  }).then((result)=>{
    User.find({
      class:result.class,
      guild:result.guild
    }).then(item=>{
      return res.status(200).json({
        total_items: item.length,
        items: item
      })
    })
  })
})

//ค้นหาด้วยห้องเรียน
router.get("/user/:classroom", (req, res, next) => {
  const classroom = req.params.classroom;

  const guild = User.aggregate([
    { $group: {_id:{guild:"$guild"}}}
  ])

  guild.then((result) => {
    return res.status(200).json({
      total_items: result.length,
      items: result,
    });
  });
});

// แก้สถานะการเข้าห้องเรียน
router.patch("/:_id", (req, res, next) => {
  const _id = req.params._id;

  Guild.update(
    {
      _id: _id,
    },
    {
      name: req.body.name,
    }
  )
    .exec()
    .then(() => {
      res.status(200).json({
        message: "เปลี่ยนชื่อกิล์ดสำเร็จ",
      });
    });
});

// ลบข้อมูลเข้าเรียน
router.delete("/:_id", (req, res, next) => {
  const _id = req.params._id;
  Guild.remove({
    _id: _id,
  })
    .exec()
    .then(() => {
      res.status(200).json({
        message: "ยุบกิล์ดสำเร็จ",
      });
    });
});

module.exports = router;
