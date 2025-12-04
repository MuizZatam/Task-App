const express = require("express");
const router = express.Router();
const controllers = require('../controllers/controllers')

router.get("/", (req, res) => {
  res.json({ message: "Hello World from Task Manager API!" });
});

router.get("/health", controllers.checkhealth);

module.exports = router;
