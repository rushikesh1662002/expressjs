let mysql = require("mysql2");

let conn = mysql.createConnection({
    host: "localhost",        // Get DB_HOST from .env
    user: "root",        // Get DB_USER from .env
    password: "Rushi", // Get DB_PASSWORD from .env
    database: "rushi"   
});
conn.connect((err)=>{
    if(err){
        console.log("Database is not connected!!!");
    }
    else{
        console.log("Database Connected...");
    }
});
module.exports = conn;