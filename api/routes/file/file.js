var cloudinary = require("cloudinary");
const express = require("express");
const router = express.Router();

//my_key:my_secret@my_cloud_name
// CLOUDINARY_URL='cloudinary:686937983637647:8pkrtmO7kPQvre9o5wjOQopo-8A@hgflnfcwf';
cloudinary.config({
  cloud_name: "hgflnfcwf",
  api_key: "686937983637647",
  api_secret: "8pkrtmO7kPQvre9o5wjOQopo-8A",
});

// สมาชิกทั้งหมด
router.post("/", (req, res, next) => {
    cloudinary.v2.uploader.upload("Todoroki.png", 
    function(error, result) {
        console.log(result, error)
        res.status(200).json({
            result
        })
    });
});

module.exports = router;
