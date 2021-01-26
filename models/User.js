const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({

  nom: {
    type: String,
  },
  prenom: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  adresse: {
    type: String,
  },
  cin: {
    type: String,
  },
  numero: {
    type: String,
  },
  motDePasse: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "utilisateur"
  },
  // mypubs: [{ type: Schema.Types.ObjectId, ref: "pub" }],
  isAdmin:{ type:Boolean, default:false, }
});

module.exports = mongoose.model("user", userSchema);
