const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

const ReservasionSchema = new Schema({
    
      user: { type: Schema.Types.ObjectId, ref: "user" },
      pub: { type: Schema.Types.ObjectId, ref: "pub" },
      dateDebut: { type: String, default: moment().format("llll") },
      dateFin: { type: String, default: moment().format("llll") },
      date: { type: String, default: moment().format("llll") }

       });
    

module.exports = mongoose.model("reservasion", ReservasionSchema);