let mysql = require("mysql2");

let conn = mysql.createConnection({
    host: "localhost",       
    user: "root",       
    password: "Rushi", 
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
