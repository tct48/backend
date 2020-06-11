const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Guild = require("../../models/user/guild");
const User = require("../../models/user/user");
const Guide = require("../../models/user/guide");

// เพิ่ม Guide
router.post("/", (req, res, next) => {
    const guide = new Guide({
        _id:new mongoose.Types.ObjectId(),
        name:req.body.name,
        url:req.body.url
    })

    guide.save().then((result)=>{
        res.status(200).json({
            message: "เพิ่ม Guide สำเร็จ!",
            item:result
        })
    })
});

// เรียกดูข้อมูลของ Guide
router.get("/", (req,res ,next)=>{
    Guide.find({}).then(item=>{
        return res.status(200).json({
            total_items:item.length,
            items:item
        })
    })
})

// แก้สถานะการเข้าห้องเรียน
router.patch("/:_id", (req, res, next) => {
  const _id = req.params._id;

  Guide.update(
    {
      _id: _id,
    },
    {
      url: req.body.url,
    }
  )
    .exec()
    .then(() => {
      res.status(200).json({
        message: 'แก้ไขลิงก์ "แนะนำระบบ" สำเร็จ',
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
