const pool = require("../config/database");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Hello World from Task Manager API!" });
});

router.get("/health", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      status: "200 OK",
      timestamp: new Date().toISOString(),
      database: "Connected!",
      db_time: result.rows[0].now,
    });
  } catch (error) {
    res.status(503).json({
      status: "ERROR",
      timestamp: new Date().toISOString(),
      database: "disconnected",
      error: error.message,
    });
  }
});

module.exports = router;
