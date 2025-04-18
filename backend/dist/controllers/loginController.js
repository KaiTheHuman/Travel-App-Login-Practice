const db = require('../../db.js'); 
const bcrypt = require('bcryptjs');

const getLogin= async (req, res) => { // go to homepage, async = queries dont need to happen all at once (allows us to use await)
  try {
    const {email, password} = req.query;
    let query = 'SELECT * FROM users WHERE '; 
    let queryParams = [];
    query += ' email = ?';
    queryParams.push(email);

    const result = await db.query(query, queryParams); //sends request
    if(password)
    {
      if(result.length>0)
      {
      const match = await bcrypt.compare(password, result[0].password);
      if (!match) {
        res.send("ERROR");
      }
      

      }
      else{
        res.send("NONE")
      }

    }
   
      console.log(result);
      console.log("SEND RESULT")
      res.json(result); //send result back as a JSON

    
  } catch (err) {
    console.error(err); //if error, log it 
  }
};




const createLogin = async (req, res) => { // go to homepage, async = queries dont need to happen all at once (allows us to use await)
  try {
    const { email, password, username, address } = req.body;//get variables
    const hash = await bcrypt.hash(password, 10);
   let query = 'INSERT INTO `users` (`email`, `password`, `username`';
    let queryParams = [];

    if(address){ //if vaiables exist add them
      query += ', `address`';
    }
    
      query += ') VALUES (?'
      queryParams.push(email);
      query += " ,? ";
      queryParams.push(hash);
      query += " ,? ";
      queryParams.push(username);
    

    if(address){
      query += " ,? ";
      queryParams.push(address);
    }
   
      query += " ) ";
    

    console.log(query);

    const result = await db.query(query, queryParams); //sends request
    console.log(result);
    res.json(result); //send back result
  
  } catch (err) {
    console.error(err); //if error, log it
    res.status(500).send('Internal Server Error');
  }
};


const updateLogin= async (req, res) => { // go to homepage, async = queries dont need to happen all at once (allows us to use await)
  try {
    const { email, password, username, address, newEmail} = req.body;
    let query = 'UPDATE `users` SET ';
    let queryParams = [];
    let updates = [];

    if(newEmail){
     updates.push(' `email` = ?');
      queryParams.push(newEmail);
    }
    if(password){
      const hash = await bcrypt.hash(password, 10);
      updates.push(' `password` = ?');
        queryParams.push( hash);
    }
    if(username){
      updates.push(' `username` = ?');
        queryParams.push( username);
    }
    if(address){
      updates.push( ' `address` = ?');
      queryParams.push(address);
    }
    query += updates.join(', ');
    query+=" WHERE `email` = ? " //paramter variables added now
    queryParams.push(email);

    
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

const deleteLogin= async (req, res) => { // go to homepage, async = queries dont need to happen all at once (allows us to use await)
  try {
    const {email} = req.query; //get vairiables
    let query = 'Delete FROM `users` WHERE email = ?';
    let queryParams = [];

      queryParams.push(email);

    console.log(query);

    let query2 = 'Delete FROM `journeyPlan` WHERE userID = ?';
    let queryParams2 = [];
    queryParams2.push(email);

    
    let query3 = 'Delete FROM `travelLogs` WHERE userID = ?';
    let queryParams3 = [];
    queryParams3.push(email);

    
    const result2 = await db.query(query2, queryParams2);
    const result3 = await db.query(query3, queryParams3);

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
const addLogin= async (req, res) => { // go to homepage, async = queries dont need to happen all at once (allows us to use await)
  try {
    const { journeyPlan, travelLogs, userID} = req.query;
    let query = 'UPDATE `users` SET ';
    let queryParams = [];
    if(journeyPlan)
    {
      query += " journeyPlan = CASE WHEN JSON_VALID(journeyPlan) THEN JSON_ARRAY_APPEND(journeyPlan, '$', ?) ELSE JSON_ARRAY(?) END WHERE email = ?"
      queryParams.push(parseInt(journeyPlan), parseInt(journeyPlan), userID);
    }
    else if(travelLogs)
    {
      query += " travelLogs = CASE WHEN JSON_VALID(travelLogs) THEN JSON_ARRAY_APPEND(travelLogs, '$', ?) ELSE JSON_ARRAY(?) END WHERE email = ?"
      queryParams.push(parseInt(travelLogs), parseInt(travelLogs), userID);
    }

    const result = await db.query(query, queryParams); //send request
    console.log(result);
    console.log(result.data);
    res.json(result);

  }
    catch (err) {
      console.error(err); //if error, log it
      res.status(500).send('Internal Server Error');
    }
  };


  const deleteAddLogin= async (req, res) => { // go to homepage, async = queries dont need to happen all at once (allows us to use await)
    try {
      const { journeyPlan, travelLogs, userID} = req.query;
      let query = 'UPDATE `users` SET ';
      let queryParams = [];
      if(journeyPlan)
      {
        query += " journeyPlan = JSON_REMOVE(journeyPlan, JSON_UNQUOTE(JSON_SEARCH(journeyPlan, 'one', ?)) )WHERE email = ?"
        queryParams.push(parseInt(journeyPlan), userID);
      }
      else if(travelLogs)
      {
        query += " travelLogs = JSON_REMOVE( travelLogs, JSON_UNQUOTE(JSON_SEARCH(travelLogs, 'one', ?)) ) WHERE email = ?"
        queryParams.push(parseInt(travelLogs), userID);
      }
  
      const result = await db.query(query, queryParams); //send request
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
    createLogin,
    getLogin,
    updateLogin,
    deleteLogin,
    addLogin,
    deleteAddLogin,
  };