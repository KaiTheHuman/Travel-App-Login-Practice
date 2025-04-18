const mysql = require('mysql'); //imports mySQL
const dbConf = {
    user: DB_USER,
    password: DB_PASS,
    host: DB_HOST,  
    database: DB_NAME
}; // connects to database 

const db = mysql.createConnection(dbConf); //create connection to mySQL
db.connect(); //connect to database
console.log("Have live database connection"); //this is sent so we know it connected correctly

module.exports = { //export query function, so that we dont need to reconnect for every query
  query: (text, params) =>{
    return new Promise((resolve, reject) =>
    {
      db.query(text, params, (err, results)=>{ //text=SQL query as a string "SELECT * FROM artists WHERE id=1"
        //params is an array of values to safly insert into the query. callback then processes the results
        if(err)
        {
            console.warn(err); //if theres an error, log it
            return reject(err);
        }
        console.log(results); //log results
        console.log("results have reached db.js"); 
        resolve(results);
      })

    })
  }
};