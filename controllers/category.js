const express = require("express");
const app = express();

exports.creactCategory = async (req, res) => {
  if (req.file) {
    res.status(200);
    res.send({
      imageUrl: `http://localhost:8000/uploads/${req.file.filename}`,
      name: req.file.filename,
    });
  }
};
