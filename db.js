"user strict";

var mysql = require("mysql2");

const connection = mysql.createPool({
  host: 'localhost',
  user: 'admin',
  password: 'P@ssword1234',
  database: 'market',
  waitForConnections: true,
  connectionLimit: 10,
});
connection.getConnection(function (err,connection) {
 if (err) throw err;
 else{
   console.log("Connection verified.")
   connection.release();
 }
});
module.exports = connection;
// module.exports = connection;
