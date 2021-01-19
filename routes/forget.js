const router = require("express").Router();
const controllers = require("../controllers/forget");





router.post('/forgotPassword' , controllers.forget);
router.get('/reset/:token', controllers.getReset);
router.post('/reset/:token', controllers.postReset);