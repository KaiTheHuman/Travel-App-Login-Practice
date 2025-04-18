
const express = require('express'); //import express
const cors = require('cors'); //prevents cors errors
const loginRoutes = require('./routes/loginRoute'); //import all our routes
const travelLogsRoutes = require('./routes/travelLogsRoute');
const journeyPlanRoutes = require('./routes/journeyPlanRoute');
const app = express(); // create express app

app.use(cors());
app.use(express.json());
app.use('/login', loginRoutes); //use Routes when user uses axios with /___
app.use('/travelLogs', travelLogsRoutes);
app.use('/journeyPlan', journeyPlanRoutes);

app.listen(3000, () => { //set up port
  console.log('Server is running on port 3000');
});