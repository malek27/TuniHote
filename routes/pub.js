const router = require("express").Router();
const controllers = require("../controllers/pub");
const {
    pubRules,
    validation,
    addComtValidator
} = require("../middleware/validator");
const isAuth = require("../middleware/passport");
const checkObjectId = require("../middleware/check")

//@method POST
//@desc POST A PUB
// @PATH  http://localhost:5000/pub/register
// @Params  Body
// register

router.post("/register",isAuth(),pubRules() , validation, controllers.pub);

//@method GET
//@desc GET ALL PUB 
// @PATH  http://localhost:5000/pub/search/:searched
// get all pubs
router.get("/", controllers.getpubs );

//@method GET
//@desc GET PUB BY ID
// @PATH  http://localhost:5000/pub/:id
// @Params  id
// get pub
router.get("/pub/:id", isAuth(),controllers.getpubById );


//@method DELETE
//@desc DELETE PUB 
// @PATH  http://localhost:5000/pub/:id
// @Params  id
// delete pub
router.delete("/:id",isAuth(), controllers.deletePub );

//Method PUT
//update a pub by id
//Path :http://localhost:5000/pub/:id
//params id and body
router.put("/SingelPub/:id", isAuth(), controllers.updatePub);

//search
router.get('/search/:titre', controllers.searchPub);


//************************Comment*************************

router.post("/comment/:idpost" ,isAuth(),controllers.addCom);
// router.put("/comment/:id", isAuth(), ,checkObjectId,controllers.editCom);
// router.delete("/comment/:id", isAuth(), ,checkObjectId,controllers.deleteCom);


//*************************Like************************


router.put("/dislike/:id", isAuth(),  controllers.dislike)
router.put("/like/:id", isAuth(),  controllers.like)

//*************************Rata************************

// router.post('/rate/:id' , isAuth(), controllers.ratingPub);

module.exports = router;