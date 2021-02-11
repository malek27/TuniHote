const router = require("express").Router();
const controllers = require("../controllers/pub");
const {
    pubRules,
    validation,
} = require("../middleware/validator");
const isAuth = require("../middleware/passport");

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
router.get('/search/:region', controllers.searchPub);


//************************Comment*************************

router.post("/comment/:idpost" ,isAuth(),controllers.addCom);
router.get("/comments/:idpost",isAuth(), controllers.getcoms );
router.delete("/comments/:id",isAuth(), controllers.deleteCom );


//*************************Like************************


router.put("/unlike/:idpost", isAuth(), controllers.unlike);
router.put("/like/:idpost", isAuth(),  controllers.like)


//*************************reservation************************

router.post("/reserver/:idpost",isAuth(), controllers.addreservation );
router.get("/reservations",isAuth(), controllers.getreservations );
router.get('/mypubs',isAuth(),controllers.Mypubs);

router.put("/accepter/:idR", isAuth(),  controllers.accepter)
router.put("/decliner/:idR", isAuth(),  controllers.decliner)




module.exports = router;