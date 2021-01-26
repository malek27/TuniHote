const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

const PubSchema = new Schema({
  // _id: mongoose.Schema.Types.ObjectId,

  titre: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  prix: {
    type: String,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  postedBy: { type: Schema.Types.ObjectId, ref: "user" },
  comments :[{ type: Schema.Types.ObjectId, ref: "comment" }],
  likes: [{ user: { type: Schema.Types.ObjectId, ref: "user" } }],
  dislikes: [{ user: { type: Schema.Types.ObjectId, ref: "user" } }],
  reservations: [{ user: { type: Schema.Types.ObjectId, ref: "reservation" } },],
 

  date: {
    type: String,
    default: moment().format("llll"),
  },
});

module.exports = mongoose.model("pub", PubSchema);
