const express = require("express");
const router = express.Router();
const authMiddleware = require("./authMiddleware");
const taskControllers = require("../controllers/taskControllers");

router.get("/", taskControllers.allTasks);

router.post("/", taskControllers.createTask);

router.put("/", taskControllers.updateTask);

router.delete("/", taskControllers.deleteTask);

module.exports = router;
