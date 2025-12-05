const pool = require("../config/database");
require("dotenv").config();

const models = {
  fetchDBTimestamp: async () => {
    const response = await pool.query("SELECT NOW()");
    return response.rows[0].now;
  },

  fetchAllTasks: async (filters = {}) => {
    let query = "SELECT * FROM tasks WHERE 1=1";
    const values = [];
    let paramCount = 1;

    if (filters.status) {
      query += ` AND status = $${paramCount}`;
      values.push(filters.status);
      paramCount++;
    }

    if (filters.priority) {
      query += ` AND priority = $${paramCount}`;
      values.push(filters.priority);
      paramCount++;
    }

    query += " ORDER BY created_at DESC";

    const result = await pool.query(query, values);

    return result.rows;
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
