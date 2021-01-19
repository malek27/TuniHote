const { check, validationResult } = require("express-validator");
const fs = require('fs')
// validation register
exports.registerRules = () => [
  check("nom", "le nom est obligatoire").notEmpty(),
  check("prenom", "le prenom est obligatoire").notEmpty(),
  check("email", "l'email est obligatoire").notEmpty(),
  check("email", "verifier votre email").isEmail(),
  check("cin", "la cin est obligatoire").notEmpty(),
  check("cin", "la cin doit avoir minimum 8 chiffres").isLength({
    min: 8,}),
  check("motDePasse", "le mot de passe est obligatoire").isLength({
    min: 6,
    max: 20,
  }),
  check("numero","le numero doit avoir minimum 8 chiffres").isLength({
    min: 8,
  }),
];

// validation login
exports.loginRules = () => [
  check("email", "l'email est obligatoire").notEmpty(),
  check("email", "verifier votre email").isEmail(),
  check(
    "motDePasse",
    "le mot de passe doit etre compris entre 8 et 20 characteres"
  ).isLength({
    min: 8,
    max: 20,
  }),
];
// validation post pub

exports.pubRules = () => [
  check("titre", "le titre est obligatoire").notEmpty(),
  check("description", "la discription est obligatoire").notEmpty(),
  check("prix", "le prix est obligatoire").notEmpty(),];

exports.validation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).send({
      errors: errors.array().map((el) => ({
        msg: el.msg,
      })),
    });
  }
  next();
};

// validation upload

exports.validationUpload = (req,res,next) =>{
if(typeof(req.file) === 'undefined' || typeof(req.body) === 'undefined' ){
  return res.status(400).send({
    errors : 'probleme with sending data'
  })
}
console.log(req.file);
let image = req.file.path
if(!(req.file.mimetype).includes('jpeg') && !(req.file.mimetype).includes('jpg') 
&& !(req.file.mimetype).includes('png')) {
fs.unlinkSync(image)
return res.status(400).send({
  errors : "file not support"
})
}
if(req.file.size > 1024*1024*2){
fs.unlinkSync(image)
return res.status(400).send({
  errors : "file is too large"
})
}
if (! image ) {
  return res.status(400).send({
    errors : "all fields are required"
  })
}
next()
}

exports.forgotPasswordValidator = [
  check('email')
      .not()
      .isEmpty()
      .isEmail()
      .withMessage('Must be a valid email address')
];

exports.resetPasswordValidator = [
  check('newPassword')
      .not()
      .isEmpty()
      .isLength({ min: 6 })
      .withMessage('Password must be at least  6 characters long')
];

exports.addComtValidator =[
  check('text', 'Text is required').not().isEmpty()
];