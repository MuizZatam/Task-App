const express = require("express");
const app = express();
const router = express.Router();
const authMiddleware = require("./authMiddleware");
const taskControllers = require("../controllers/taskControllers");


router.get("/", authMiddleware, taskControllers.allTasks);

router.post("/", authMiddleware, taskControllers.createTask);

router.put("/", authMiddleware, taskControllers.updateTask);

router.delete("/", authMiddleware, taskControllers.deleteTask);

module.exports = router;
