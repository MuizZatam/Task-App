require("dotenv").config();

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

const { Pool } = require("pg");
const pool = new Pool({
  host: "db",
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: 5432,
});

module.exports = pool;
