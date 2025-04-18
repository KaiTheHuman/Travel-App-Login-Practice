const express = require('express');//import controller and stuff
const router = express.Router();
const journeyPlanController = require('../controllers/journeyPlanController');

// Routes for Songs
router.get('/getAllJourneyPlan', journeyPlanController.getAllJourneyPlan);
router.get('/getJourneyPlan', journeyPlanController.getJourneyPlan);
router.get('/createJourneyPlan', journeyPlanController.createJourneyPlan);
router.get('/deleteJourneyPlan', journeyPlanController.deleteJourneyPlan);
router.get('/updateJourneyPlan', journeyPlanController.updateJourneyPlan);

module.exports = router;