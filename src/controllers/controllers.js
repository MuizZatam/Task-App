const models = require("../models/models");

const controllers = {
  checkHealth: async (req, res) => {
    try {
      const response = await models.fetchDBTimestamp();
      res.json({
        status: "OK",
        timestamp: new Date().toISOString(),
        database: "CONNECTED",
        db_time: response,
      });
    } catch (error) {
      res.status(503)({
        status: "ERROR",
        timestamp: new Date().toISOString(),
        database: "disconnected",
        error: error.message,
      });
    }
  },

  allTasks: async (req, res) => {
    try {
      const response = await models.fetchAllTasks();
      res.json({
        response,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createTask: async (req, res) => {
    try {
      const { title, description, status, priority, due_date } = req.body;

      if (!title) {
        return res.status(400).json({ error: "Title is required" });
      }

      const newTask = await models.createTask({
        title,
        description,
        status,
        priority,
        due_date,
      });

      res.status(201).json({
        message: "Task created successfully",
        task: newTask,
      });
    } catch (error) {
      console.error("Error creating task:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = controllers;
