const express = require("express");
const app = express();
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const filerFilter = (req, file, cb) => {
  
  cb(null, true);
  
};
const upload = multer({ storage : storage, fileFilter: filerFilter });

module.exports = upload.single("categoryImage")
// array('images', 100)
// single("categoryImage")
