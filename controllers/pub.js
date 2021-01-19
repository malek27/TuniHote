const Pub = require("../models/Pub");
const User = require("../models/User");
const Comment = require("../models/Comment");
var cron = require("node-cron");
const { Schema } = require("mongoose");
require("dotenv").config();
const { validationResult } = require("express-validator");
const user = require("../models/User");

// post pub

exports.pub = async (req, res) => {
  const {
    titre,
    description,
    region,
    prix,
    info: { imageUrl },
  } = req.body;
  const userId = req.user._id;
 

  console.log(user)
  try {
    const newPub = new Pub({
      titre,
      description,
      region,
      prix,
      imageUrl,
      postedBy: userId,
      likers: [],
      comments: [],
    });
    
     // save the pub
    const newPube = await newPub.save();
    res.status(200).send({
      pub: newPube,
      message: "la publication est sauvgarder avec succee",
    });
  } catch (error) {
    console.clear();
    console.dir(error);
    res
      .status(500)
      .send({ message: "la publication n'a pas etait sauvgarder" });
  }
};

//Get all pub

exports.getpubs = async (req, res) => {
  try {
    let result = await Pub.find().sort({ date: -1 }).populate("postedBy");
    res
      .status(200)
      .send({ response: result, message: "Getting pubs successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "les publications nont pas etait afficher" });
  }
};
//Get a pub by id

exports.getpubById = async (req, res) => {
  console.log("bject");
  try {
    const result = await Pub.findOne({ _id: req.params.id }).populate(
      "comments"
    );

    res.status(200).send({
      response: result,
      message: "Got the desired pub successfullY !",
    });
  } catch (e) {
    res.status(500).send({ message: "there is no pub with this id !" });
  }
};

//delete pub by id
exports.deletePub = async (req, res) => {
  try {
    let result = await Pub.deleteOne({ _id: req.params.id });
    result
      ? res
          .status(200)
          .send({ response: result, message: "votre pub a etait supprimer" })
      : res.status(500).send({ message: "il y a pas de pub avec cette id" });
  } catch (error) {
    res.status(500).send({ message: "il y a pas de id" });
  }
};

//Update a pub by id
exports.updatePub = async (req, res) => {
  try {
    const result = await Pub.updateOne(
      { _id: req.params.id },
      { $set: { ...req.body } }
    );
    result.dModified
      ? res.status(200).send({
          message: "deja modifier",
        })
      : res.send({ message: "Updated the desired pub successfully !" });
  } catch (e) {
    res.status(500).send({ message: "there is no pub with this id !" });
  }
};

//search

exports.searchPub = async (req, res) => {
  try {
    const re = new RegExp(req.params.titre, "i");
    const pub = await Pub.find({
      $or: [{ titre: { $regex: re } }, { titre: { $regex: re } }],
    });

    //

    res.json(pub);
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
};

// add com

exports.addCom = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    
    const user = await User.findById(req.user.id);

    const { text } = req.body;
    const newComment = new Comment({
      text,
      user: user.id,
      pub: req.params.idpost,
    });

    await newComment.save();
    // const comments = await Pub.findById(req.params.comments);
     await Pub.findOneAndUpdate({ _id: req.params.idpost },{ $push: {comments: newComment } })
    res.json(newComment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route    PUT /pubs/like/:id
// @desc     Like a pub
// @access   Private

exports.like = async (req, res) => {
  try {
    const pub = await Pub.findById(req.params.id);

    // Check if the pub has already been liked
    if (
      pub.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      pub.likes = pub.likes.filter(
        ({ user }) => user.toString() !== req.user.id
      );

      await pub.save();

      return res.json(pub.likes);
    } else if (
      pub.dislikes.filter((dislike) => dislike.user.toString() === req.user.id)
        .length > 0
    ) {
      pub.dislikes = pub.dislikes.filter(
        ({ user }) => user.toString() !== req.user.id
      );

      await pub.save();

      return res.json(pub.likes);
    } else {
      pub.likes.unshift({ user: req.user.id });

      await pub.save();

      res.json(pub.likes);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route    PUT /pubs/dislike/:id
// @desc     dislike a pub
// @access   Private
exports.dislike = async (req, res) => {
  try {
    const pub = await Pub.findById(req.params.id);

    // Check if the pub has already been liked/disliked
    if (
      pub.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      pub.likes = pub.likes.filter(
        ({ user }) => user.toString() !== req.user.id
      );

      await pub.save();

      return res.json(pub.dislikes);
    } else if (
      pub.dislikes.filter((dislike) => dislike.user.toString() === req.user.id)
        .length > 0
    ) {
      pub.dislikes = pub.dislikes.filter(
        ({ user }) => user.toString() !== req.user.id
      );

      await pub.save();

      return res.json(pub.dislikes);
    } else {
      pub.dislikes.unshift({ user: req.user.id });

      await pub.save();

      res.json(pub.dislikes);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// rating

exports.ratingPub = async (req, res) => {
  try {
    const pub = await Pub.findById(req.params.id);
    const user = await User.findById(req.user.id).select("-password");
    if (
      pub.rate.filter((rate) => rate.user.toString() === req.user.id).length > 0
    ) {
      return res.status(400).json({ msg: "Post already rated" });
    }
    // pub.rate.unshift({ user: req.user.id });

    const newrate = {
      rating: req.body.rating,
      user: req.user.id,
    };
    pub.rate.unshift(newrate);
    console.log(pub);
    // await pub.save();
    let sum = 0;
    pub.rate.forEach((r) => {
      sum = sum + r.rating;
    });
    pub.avg = sum / pub.rate.length;

    console.log(pub.avg);
    await pub.save();
    res.json(pub.rate);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Pub not found" });
    }
    res.status(500).send("server Error");
  }
};

cron.schedule("* * * * *", async function () {
  console.log("run every 60 sec");
  const pub = await Pub.find();
  pub.forEach((e) => {
    if (e.avg < 3) {
      e.remove();
    }
  });
});

//******************************************************
