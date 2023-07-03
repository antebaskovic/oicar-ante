const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "password",
  database: "FitnessApp",
  port: 3306,
  waitForConnections: true,
  connectionLimit: 20,
  queueLimit: 0,
});

module.exports = pool;
