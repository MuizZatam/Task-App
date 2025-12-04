const pool = require('../config/database')


const models = {

    fetchDBTimestamp: async () => {
        const response = await pool.query('SELECT NOW()');
        return response;
    }
}

module.exports = models;