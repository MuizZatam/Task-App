const models = require("../models/models");
const utils = require("./utils/utils");

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
      res.status(503).json({
        status: "ERROR",
        timestamp: new Date().toISOString(),
        database: "disconnected",
        error: error.message,
      });
    }
  },

  allTasks: async (req, res) => {
    try {
      const { status, priority} = req.query;

      const filters = {};

      if (status) filters.status = utils.titleCase(status);
      if (priority) filters.priority = utils.titleCase(priority);

      const response = await models.fetchAllTasks(filters);
      res.json({
        count: response.length,
        filters: filters,
        tasks: response,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createTask: async (req, res) => {
    try {
      let { title, description, status, priority, due_date } = req.body;

      if (!title) {
        return res.status(400).json({ error: "Title is required" });
      }

      due_date = utils.normalizeDateToUTC(due_date);
      status = utils.titleCase(status);
      priority = utils.titleCase(priority);

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

  updateTask: async (req, res) => {

    try {
      const { id, title, description, status, priority, due_date } = req.body;

      const fields = {};

      if (!id) {
        return res.status(400).json({ error: "task id is required"});
      } 

      if (title) fields.title = title;
      if (description) fields.description = description;
      if (status) fields.status = utils.titleCase(status);
      if (priority) fields.priority = utils.titleCase(priority);
      if (due_date) fields.due_date = utils.normalizeDateToUTC(due_date);

      const updated = await models.updateTask(id, fields);

      res.status(201).json({
        message: "Task Updated Succesfully!",
        task: updated
      })
    } catch (error) {

      console.error("Error updating task: ", error);
      res.status(500).json({error: "Internal server error"});
    }
  }
};

module.exports = controllers;
