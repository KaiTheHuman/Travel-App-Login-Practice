const express = require('express');//import controller and stuff
const router = express.Router();
const travelLogsController = require('../controllers/travelLogsController');

// Routes for Songs
router.get('/getAllTravelLogs', travelLogsController.getAllTravelLogs);
router.get('/getTravelLogs', travelLogsController.getTravelLogs);
router.get('/createTravelLogs', travelLogsController.createTravelLogs);
router.get('/deleteTravelLogs', travelLogsController.deleteTravelLogs);
router.get('/updateTravelLogs', travelLogsController.updateTravelLogs);

module.exports = router;