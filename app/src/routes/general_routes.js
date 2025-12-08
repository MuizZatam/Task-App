const express = require("express");
const router = express.Router();
const taskControllers = require("../controllers/taskControllers");

router.get("/", (req, res) => {
  res.json({ message: "Hello World from Task Manager API!" });
});

router.get("/health", taskControllers.checkHealth);

module.exports = router;
