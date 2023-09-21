const Pool = require("pg").Pool;
require("dotenv").config();

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "todoapp",
  password: process.env.PASSWORD,
  port: 5432,
});

module.exports = pool;
