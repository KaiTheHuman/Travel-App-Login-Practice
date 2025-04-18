const db = require('../../db.js'); //import database connection, needed to execute queries.

//-----------------------SEARCH FUNTIONS-----------------------------------------

const getAllJourneyPlan= async (req, res) => { // go to homepage, async = queries dont need to happen all at once (allows us to use await)
  try {
    const {userID} = req.query; 
    let query = 'SELECT * FROM journeyPlan WHERE userID = ?'; //try getting all users. await= wait for query to finish before next step
    let queryParams = [];
    queryParams.push(userID);
    const result = await db.query(query, queryParams);
    console.log(result);
    res.json(result); //send result back as a JSON
  } catch (err) {
    console.error(err); //if error, log it
    res.status(500).send('Internal Server Error');
  }
};

const getJourneyPlan= async (req, res) => { // go to homepage, async = queries dont need to happen all at once (allows us to use await)
  try {
    const {id, name, locations, activites, startDate, endDate, userID} = req.query; //get parameters
    let query = 'SELECT * FROM journeyPlan WHERE 1=1 '; //start query string 
    let queryParams = [];

    if(userID){ //add variables if they exist
      query += ' AND userID = ?';
      queryParams.push(userID);
    }

    if(id){ //add variables if they exist
      query += ' AND id = ?';
      queryParams.push(parseInt(id));
    }

    if(name){
      query += ' AND name = ?';
      queryParams.push(name);
    }
    if(locations){
      const locArray = locations.split(',').map(location => location.trim()); 
      locArray.forEach(location => {
        query += ' AND JSON_CONTAINS(locations, ?)';
        queryParams.push(`"${location}"`);
      });
      }

      if(activites){
        const actArray = activites.split(',').map(activity => activity.trim()); 
        actArray.forEach(activity => {
          query += ' AND JSON_CONTAINS(activites, ?)';
          queryParams.push(`"${activity}"`);
        });
      }
  

    if(startDate){
      query += ' AND startDate = ?';
      queryParams.push(startDate);
    }
    
    if(endDate){
        query += ' AND endDate = ?';
        queryParams.push(endDate);
      }
      
    console.log(query);

    const result = await db.query(query, queryParams); //sends request
    res.json(result); //send results back as a JSON file
  } catch (err) {
    console.error(err); //if error, log it
    res.status(500).send('Internal Server Error');
  }
};

//-------------------------------CREATE---------------------------------------

const createJourneyPlan= async (req, res) => { // go to homepage, async = queries dont need to happen all at once (allows us to use await)
  try {
    console.log("Reached controller")
    const { name, desc, locations, activites, startDate, endDate, userID} = req.query; //get variables

   
    let query = 'INSERT INTO `journeyPlan` ( name';
    let queryParams = [];

    if(desc){ //if vaiables exist add them
      query += ', `desc`';
    }
    
    if(locations){ //if vaiables exist add them
        query += ', `locations`';
      }
      
    if(activites){ //if vaiables exist add them
        query += ', `activites`';
      }
    if(startDate){ //if vaiables exist add them
      query += ', `startDate`';
    }
    if(endDate){ //if vaiables exist add them
      query += ', `endDate`';
    }
    
      query += ', `userID` ) VALUES (?'
      queryParams.push(name);
    

    if(desc){
      query += " ,? ";
      queryParams.push(desc);
    }
    if(locations){
      const locArray = locations.split(',').map(location => location.trim()); 
      query += ', JSON_ARRAY(?)';  
      queryParams.push(locArray);
      }
      if(activites){
        const actArray = activites.split(',').map(activity => activity.trim()); 
      query += ', JSON_ARRAY(?)';  
      queryParams.push(actArray);
      }
    if(startDate){
        let newDate = new Date(startDate);
        newDate.setUTCHours(0, 0, 0, 0);
        newDate = new Date(Date.UTC(newDate.getFullYear(), newDate.getMonth(), newDate.getDate()+1));
        newDate = newDate.toISOString().split('T')[0];
      query += " ,? ";
      queryParams.push(newDate);
    }
    if(endDate){
        let newDate = new Date(endDate);
        newDate.setUTCHours(0, 0, 0, 0);
        newDate = new Date(Date.UTC(newDate.getFullYear(), newDate.getMonth(), newDate.getDate()+1));
        newDate = newDate.toISOString().split('T')[0];
      query += " ,? ";
      queryParams.push(newDate);
    }
   
      query += " ,? ) ";
      queryParams.push(userID);
    

    console.log(query);


    const result = await db.query(query, queryParams); //sends request
    console.log(result);
    console.log(result.data);
    res.json(result); //send back result
  
  } catch (err) {
    console.error(err); //if error, log it
    res.status(500).send('Internal Server Error');
  }
};

//-----------------------------DELETE---------------------------------------------

const deleteJourneyPlan= async (req, res) => { // go to homepage, async = queries dont need to happen all at once (allows us to use await)
  try {
    const {id} = req.query; //get vairiables
    let query = 'Delete FROM `journeyPlan` WHERE id = ?';
    let queryParams = [];

      queryParams.push(parseInt(id));

    console.log(query);


    const result = await db.query(query, queryParams); //send request
    console.log(result);
    console.log(result.data);
    res.json(result); //send result
  }
   catch (err) {
    console.error(err); //if error, log it
    res.status(500).send('Internal Server Error');
  }
};

//----------------------------------------------UPDATE------------------------------------------------------------

const updateJourneyPlan= async (req, res) => { // go to homepage, async = queries dont need to happen all at once (allows us to use await)
  try {
    const { id, name, desc, locations, activites, startDate, endDate} = req.query;
    let query = 'UPDATE `journeyPlan` SET ';
    let queryParams = [];

      query += ' `name` = ?';
      queryParams.push(name);

    if(desc){
     query += ', `desc` = ?';
      queryParams.push(desc);
    }
    if(locations){
      const locArray = locations.split(',').map(location => location.trim());
      query += ', `locations` = JSON_ARRAY(?)';
      queryParams.push(locArray);
       }
       if(activites){
        const actArray = activites.split(',').map(activity => activity.trim());
      query += ', `activites` = JSON_ARRAY(?)';
      queryParams.push(actArray);
       }
    if(startDate){
        let newDate = new Date(startDate);
        newDate.setUTCHours(0, 0, 0, 0);
        newDate = new Date(Date.UTC(newDate.getFullYear(), newDate.getMonth(), newDate.getDate()+1));
        newDate = newDate.toISOString().split('T')[0];
       query += ', `startDate` = ?';
        queryParams.push( newDate);
    }
    if(endDate){
        let newDate = new Date(endDate);
        newDate.setUTCHours(0, 0, 0, 0);
        newDate = new Date(Date.UTC(newDate.getFullYear(), newDate.getMonth(), newDate.getDate()+1));
        newDate = newDate.toISOString().split('T')[0];
       query += ', `endDate` = ?';
        queryParams.push( newDate);
    }

    query+=" WHERE `id` = ? " //paramter variables added now
    queryParams.push(parseInt(id));

    
    console.log(query);


    const result = await db.query(query, queryParams);
    console.log(result);
    console.log(result.data);
    res.json(result);
  }
   catch (err) {
    console.error(err); //if error, log it
    res.status(500).send('Internal Server Error');
  }
};

module.exports = { //export everything
    getAllJourneyPlan,
    getJourneyPlan,
    createJourneyPlan,
    deleteJourneyPlan,
    updateJourneyPlan,
  };




