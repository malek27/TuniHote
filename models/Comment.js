const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

const CommentSchema = new Schema({
    
      user: { type: Schema.Types.ObjectId, ref: "user" },
      pub: { type: Schema.Types.ObjectId, ref: "pub" },
      text: { type: String },
      date: { type: String, default: moment().format("llll") }

       });
    

module.exports = mongoose.model("comment", CommentSchema);