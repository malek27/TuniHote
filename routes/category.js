const router = require("express").Router();
const controllers = require("../controllers/category");

const uploadMulter =require ('../middleware/upload')
const {
    validationUpload
} = require("../middleware/validator");


router.post('/category', uploadMulter, controllers.creactCategory)

module.exports = router