const router = require("express").Router();
const controllers = require("../controllers/user");
const {
  loginRules,
  registerRules,
  validation,
} = require("../middleware/validator");

const isAuth = require("../middleware/passport");

//@method POST
//@desc POST A USER
// @PATH  http://localhost:5000/user/register
// @Params  Body
// register
router.post("/register", registerRules(), validation, controllers.register);

//@method POST
//@desc POST A USER
// @PATH  http://localhost:5000/user/login
// @Params  Body
// register
// login
router.post("/login", loginRules(), validation, controllers.login);

//@method POST
//@desc GET A USER
// @PATH  http://localhost:5000/user/current
// @Params  Body
// get current user
router.get("/current", isAuth(), controllers.current);


//@method GET
//@desc GET A USER
// @PATH  http://localhost:5000/user/logout
// @Params  Body
// logout
router.get("/logout", isAuth(),controllers.logout);

//@method GET
//@desc GET ALL USER
// @PATH  http://localhost:5000/user/ListeUser
// get all users
router.get("/ListeUser", isAuth(),controllers.getusers );

//@method GET
//@desc GET USER
// @PATH  http://localhost:5000/user/:id
// get user by id
router.get("/:id", isAuth(),controllers.getuserById);

//@method DELETE
//@desc DELETE USER 
// @PATH  http://localhost:5000/user/:id
// @Params  id
// delete user
router.delete("/:id",isAuth(), controllers.deleteuser );

//Method PUT
//update a user by id
//Path :http://localhost:5000/Profile/user/:id
//params id and body
router.put("/Profile/:id", isAuth(),controllers.updateUser);



// forgot reset password
// router.put('/forgotpassword', forgotPasswordValidator, controllers.forgotPasswordController);
// router.put('/resetpassword', resetPasswordValidator, controllers.resetPasswordController);
module.exports = router;
