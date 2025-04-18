const db = require('../../db.js'); //import database connection, needed to execute queries.

//-----------------------SEARCH FUNTIONS-----------------------------------------

const getAllTravelLogs= async (req, res) => { // go to homepage, async = queries dont need to happen all at once (allows us to use await)
  try {
    const {userID} = req.query; 
    let query = 'SELECT * FROM travelLogs WHERE userID = ?'; //try getting all users. await= wait for query to finish before next step
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

const getTravelLogs= async (req, res) => { // go to homepage, async = queries dont need to happen all at once (allows us to use await)
  try {
    const {id, title, startDate, endDate, date, tags, userID} = req.query; //get parameters
    let query = 'SELECT * FROM travelLogs WHERE 1=1'; //start query string 
    let queryParams = [];

    if(userID){ //add variables if they exist
      query += ' AND userID = ?';
      queryParams.push(userID);
    }

    if(id){ //add variables if they exist
      query += ' AND id = ?';
      queryParams.push(parseInt(id));
    }

    if(title){
      query += ' AND title = ?';
      queryParams.push(title);
    }

    if(startDate){
      query += ' AND startDate = ?';
      queryParams.push(startDate);
    }
    
    if(endDate){
        query += ' AND endDate = ?';
        queryParams.push(endDate);
      }
      
    if(date){
        query += ' AND date = ?';
        queryParams.push(date);
      }

      if (tags) {
        const tagArray = tags.split(',').map(tag => tag.trim());
      tagArray.forEach(tag => {
       query += " AND JSON_CONTAINS(tags, ?)";
       queryParams.push(`["${tag}"]`); // Note that the parameter must be a valid JSON array
        });
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

const createTravelLogs= async (req, res) => { // go to homepage, async = queries dont need to happen all at once (allows us to use await)
  try {
    console.log("Reached controller")
    const { title, desc, startDate, endDate, date, tags, userID} = req.query; //get variables

   
    let query = 'INSERT INTO `travelLogs` ( title';
    let queryParams = [];

    if(desc){ //if vaiables exist add them
      query += ', `desc`';
    }
    if(startDate){ //if vaiables exist add them
      query += ', `startDate`';
    }
    if(endDate){ //if vaiables exist add them
      query += ', `endDate`';
    }
    if(date)
    {
      query += ', `date`'
    }
    if(tags){ //if vaiables exist add them
      query += ', `tags`';
    }
    
    query += ', `userID` ) VALUES (?'
      queryParams.push(title);
    

    if(desc){
      query += " ,? ";
      queryParams.push(desc);
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

    if(date){
        let newDate = new Date(date);
        newDate.setUTCHours(0, 0, 0, 0);
        newDate = new Date(Date.UTC(newDate.getFullYear(), newDate.getMonth(), newDate.getDate()+1));
        newDate = newDate.toISOString().split('T')[0];
      query += " ,? ";
      queryParams.push(newDate);
    }
    if(tags){
      const tagArray = tags.split(',').map(tag => tag.trim()); 
      query += ', JSON_ARRAY(?)';  
      queryParams.push(tagArray);
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

const deleteTravelLogs= async (req, res) => { // go to homepage, async = queries dont need to happen all at once (allows us to use await)
  try {
    const {id} = req.query; //get vairiables
    let query = 'Delete FROM `travelLogs` WHERE id = ?';
    let queryParams = [];

      queryParams.push(parseInt(id));

    console.log(query);

      /*const [album] = await db.query('SELECT album_list FROM artists WHERE id = ?', id) //see if theres any albums connected to artist
      if(album)
      {
         await db.query('UPDATE Albums SET artist = NULL WHERE artist = ?', [ id]) //delete artistid from album 
      }*/


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

const updateTravelLogs= async (req, res) => { // go to homepage, async = queries dont need to happen all at once (allows us to use await)
  try {
    const { id, title, desc, startDate, endDate, tags} = req.query;
    let query = 'UPDATE `travelLogs` SET ';
    let queryParams = [];

      query += ' `title` = ?';
      queryParams.push(title);

    if(desc){
     query += ', `desc` = ?';
      queryParams.push(desc);
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
    if(tags){
      const tagArray = tags.split(',').map(tag => tag.trim());
      query += ', `tags` = JSON_ARRAY(?)';
      queryParams.push(tagArray);
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
    getAllTravelLogs,
    getTravelLogs,
    createTravelLogs,
    deleteTravelLogs,
    updateTravelLogs,
  };




