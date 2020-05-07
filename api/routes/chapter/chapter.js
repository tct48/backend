const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Chapter = require('../../models/chapter/chapter');

// เรียกดู Chapter ทั้งหมด
router.get('/', (req, res, next) => {
  Chapter.find({}).then(result => {
    return res.status(200).json({
        total_items: result.length,
        items: result
    })
  })
})

router.get('/:_id', (req, ers) => {
  const _id = req.params._id;
  Chapter.find({_id:_id}
    .exec()
    .then(result=>{
    return res.status(200).json({
      result
    })
  }))
})

// เพิ่มแหล่งการเรียนรู้
router.post('/', (req, res, next) => {  
  const chapter = new Chapter({
    _id: new mongoose.Types.ObjectId(),
    name : req.body.name, 
    title: req.body.title,
    quiz: req.body.quiz,
    created: new Date
  })

  chapter.save()
    .then(result => {
        res.status(200).json({
            message: "เพิ่มหน่วยการเรียนรู้เรียบร้อยแล้ว",
            created: result
        })
    })
})

// ลบแหล่งการเรียนรู้
router.delete('/:_id', (req, res, next)=> {
    const _id = req.params._id;
    Chapter.remove({
        _id: _id
    })
    .exec()
    .then(()=> {
        res.status(200).json({
            message: "Chapter is deleted",
        })
    })
})

// แก้ไขแหล่งการเรียนรู้
router.patch("/:_id", (req, res, next) => {
  const _id = req.params._id;

  Chapter.update({
    _id: _id
  }, {
    $set : req.body
  })
  .exec()
  .then(() => {
    res.status(200).json({
      message: "Chapter is updated"
    })
  })
})

module.exports = router;
