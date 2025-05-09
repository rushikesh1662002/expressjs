let mysql = require("mysql2");

let conn = mysql.createConnection({
    host: process.env.DB_HOST,        // Get DB_HOST from .env
    user: process.env.DB_USER,        // Get DB_USER from .env
    password: process.env.DB_PASSWORD, // Get DB_PASSWORD from .env
    database: process.env.DB_NAME   
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