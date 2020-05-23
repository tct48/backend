const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Attendence = require("../../models/user/attendence");

// สมาชิกทั้งหมด
router.post("/", (req, res, next) => {
    const attendence = new Attendence({
        _id: new mongoose.Types.ObjectId(),
        ref: req.body.ref,
        created: req.body.created,
        status: req.body.status,
        user: req.body.user
    })

    attendence.save().then(result=>{
        res.status(200).json({
            message:"สร้างห้องเรียนเรียบร้อยแล้ว !",
            item: result
        })
    })
});

router.get("/", (req, res, next) => {
    var sp=req.params.sp;
    var lp=req.params.lp;
    
})

module.exports = router;