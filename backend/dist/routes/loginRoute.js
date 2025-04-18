const express = require('express');//import controller and stuff
const router = express.Router();
const loginController = require('../controllers/loginController');

// Routes for clients

router.post('/createLogin', loginController.createLogin);
router.get('/getLogin', loginController.getLogin);
router.get('/deleteLogin', loginController.deleteLogin);
router.post('/updateLogin', loginController.updateLogin);
router.get('/addLogin', loginController.addLogin);
router.get('/deleteAddLogin', loginController.deleteAddLogin);


module.exports = router;