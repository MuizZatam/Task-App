const pool = require('../config/database');
require('dotenv').config();

const models = {

    fetchDBTimestamp: async () => {
        const response = await pool.query('SELECT NOW()');
        return response;
    },

    fetchAllTasks: async () => {
        const response = await pool.query('SELECT title, status FROM tasks');
        return response.rows;
    }
}

module.exports = models;