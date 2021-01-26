const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  const { nom, prenom, email, adresse, cin, numero, motDePasse, role } = req.body;
  try {
    const newUser = new User({
      nom,
      prenom,
      email,
      adresse,
      cin,
      numero,
      motDePasse,
      role,
    });

    //   check if the email exist
    const searchedUser = await User.findOne({ email });

    if (searchedUser) {
      return res.status(400).send({ msg: "l'email existe deja" });
    }

    // hash password
    const salt = 10;
    const genSalt = await bcrypt.genSalt(salt);
    const hashedPassword = await bcrypt.hash(motDePasse, genSalt);
    console.log(hashedPassword);
    newUser.motDePasse = hashedPassword;
    // save the user
    const newUserToken = await newUser.save();
    // generate a token
    const payload = {
      _id: newUserToken._id,
      nom: newUserToken.nom,
    };
    const token = await jwt.sign(payload, process.env.SecretOrKey, {
      expiresIn: 3600,
    });
    res.status(200).send({
      user: newUserToken,
      msg: "l'utilisateur est sauvgarder avec succee",
      token: ` Bearer ${token}`,
      role
    });
  } catch (error) {
    console.clear();
    console.dir(error);
    res.status(500).send({ msg: "l'utilisateur n'a pas etait sauvgarder" });
  }
};
exports.login = async (req, res) => {
  const { email, motDePasse } = req.body;
  try {
    //   find if the user exist
    const searchedUser = await User.findOne({ email });
    // if thhe email not exist
    if (!searchedUser) {
      return res.status(400).send({ msg: "verifier l'un des données saisie" });
    }
    // password are equals
    const match = await bcrypt.compare(motDePasse, searchedUser.motDePasse);

    if (!match) {
      return res.status(400).send({ msg: "verifier l'un des données saisie" });
    }
    // generate a token
    const payload = {
      _id: searchedUser._id,
      nom: searchedUser.nom,

    };
    const token = await jwt.sign(payload, process.env.SecretOrKey, {
      expiresIn: 3600,
    });
    // send the user
    res
      .status(200)
      .send({ user: searchedUser, msg: "success", token: ` Bearer ${token}`});
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "l'operation a echouer" });
  }
};
exports.current = (req, res) => {
  res.status(200).send({ user: req.user });
};

//logout

exports.logout = (req, res) => {
    res.status(200).send({ user: req.logout() });
  };

  //Get all user 

exports.getusers = async (req, res) => {
  try {
    let result = await User.find();
    res.status(200).send({ response: result, message: "Getting users successfully" });
  } catch (error) {
    res.status(500).send({ message: "les utilisateurs nont pas etait afficher" });
  }
};

// get user by id

exports.getuserById=async (req, res) => {
  try {
    let result = await User.findById( req.params.id );
    res.status(200).send({
      response: result,
      message: "Got the desired user successfullY !",
    });
  } catch (e) {
    res.status(500).send({ message: "there is no user with this id !" });
  }
}

//delete user by id

exports.deleteuser = async (req, res) => {
  try {
    let result = await User.findByIdAndDelete( req.params.id );
   result ? res.status(200).send({ response: result, message: "votre user a etait supprimer" }):
   res.status(500).send({ message: "il y a pas de user avec cette id" });
  } catch (error) {
    res.status(500).send({ message: "il y a pas de id" });
  }
};

//Update a user by id
exports.updateUser=async (req, res) => {
  try {
    const result = await User.updateOne({ _id: req.params.id },{$set:{...req.body}});
    result.dModified? res.status(200).send({
      message: "deja modifier !",
    }):res.send({message:"Updated the desired user successfully !"});
  } catch (e) {
    res.status(500).send({ message: "there is no user with this id !" });
  }
}



// forget password

// exports.forgotPasswordController = (req, res) => {
//   const { email } = req.body;
//   const errors = validationResult(req);

//   if (!errors.isEmpty()) {
//     const firstError = errors.array().map(error => error.msg)[0];
//     return res.status(422).json({
//       errors: firstError
//     });
//   } else {
//     User.findOne(
//       {
//         email
//       },
//       (err, user) => {
//         if (err || !user) {
//           return res.status(400).json({
//             error: 'User with that email does not exist'
//           });
//         }

//         const token = jwt.sign(
//           {
//             _id: user._id
//           },
//           process.env.JWT_RESET_PASSWORD,
//           {
//             expiresIn: '10m'
//           }
//         );

//         const emailData = {
//           from: process.env.EMAIL_FROM,
//           to: email,
//           subject: `Password Reset link`,
//           html: `
//                     <h1>Please use the following link to reset your password</h1>
//                     <p>${process.env.CLIENT_URL}/users/password/reset/${token}</p>
//                     <hr />
//                     <p>This email may contain sensetive information</p>
//                     <p>${process.env.CLIENT_URL}</p>
//                 `
//         };

//         return user.updateOne(
//           {
//             resetPasswordLink: token
//           },
//           (err, success) => {
//             if (err) {
//               console.log('RESET PASSWORD LINK ERROR', err);
//               return res.status(400).json({
//                 error:
//                   'Database connection error on user password forgot request'
//               });
//             } else {
//               sgMail
//                 .send(emailData)
//                 .then(sent => {
//                   // console.log('SIGNUP EMAIL SENT', sent)
//                   return res.json({
//                     message: `Email has been sent to ${email}. Follow the instruction to activate your account`
//                   });
//                 })
//                 .catch(err => {
//                   // console.log('SIGNUP EMAIL SENT ERROR', err)
//                   return res.json({
//                     message: err.message
//                   });
//                 });
//             }
//           }
//         );
//       }
//     );
//   }
// };

// // reset password

// exports.resetPasswordController = (req, res) => {
//   const { resetPasswordLink, newPassword } = req.body;

//   const errors = validationResult(req);

//   if (!errors.isEmpty()) {
//     const firstError = errors.array().map(error => error.msg)[0];
//     return res.status(422).json({
//       errors: firstError
//     });
//   } else {
//     if (resetPasswordLink) {
//       jwt.verify(resetPasswordLink, process.env.JWT_RESET_PASSWORD, function(
//         err,
//         decoded
//       ) {
//         if (err) {
//           return res.status(400).json({
//             error: 'Expired link. Try again'
//           });
//         }

//         User.findOne(
//           {
//             resetPasswordLink
//           },
//           (err, user) => {
//             if (err || !user) {
//               return res.status(400).json({
//                 error: 'Something went wrong. Try later'
//               });
//             }

//             const updatedFields = {
//               password: newPassword,
//               resetPasswordLink: ''
//             };

//             user = _.extend(user, updatedFields);

//             user.save((err, result) => {
//               if (err) {
//                 return res.status(400).json({
//                   error: 'Error resetting user password'
//                 });
//               }
//               res.json({
//                 message: `Great! Now you can login with your new password`
//               });
//             });
//           }
//         );
//       });
//     }
//   }
// };
