const pool = require("../config/database");
require("dotenv").config();

const models = {
  fetchDBTimestamp: async () => {
    const response = await pool.query("SELECT NOW()");
    return response.rows[0].now;
  },

  fetchAllTasks: async () => {
    const response = await pool.query("SELECT title, status FROM tasks");
    return response.rows;
  },

  createTask: async ({ title, description, status, priority, due_date }) => {
    const query = `
            INSERT INTO tasks (title, description, status, priority, due_date)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `;
    const values = [title, description, status, priority, due_date];
    const response = await pool.query(query, values);
    return response.rows[0];
  },
};

module.exports = models;
