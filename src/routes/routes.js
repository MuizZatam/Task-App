const express = require("express");
const router = express.Router();
const controllers = require("../controllers/controllers");

router.get("/", (req, res) => {
  res.json({ message: "Hello World from Task Manager API!" });
});

router.get("/health", controllers.checkHealth);

router.get("/api/tasks", controllers.allTasks);

router.post("/api/tasks", controllers.createTask);

module.exports = router;
