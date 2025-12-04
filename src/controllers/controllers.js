const models = require('../models/models');

const controllers = {

    checkhealth: async (req, res) => {
        try {
            response = await models.fetchDBTimestamp();
            res.json({
                status: "OK",
                timestamp: new Date().toISOString(),
                database: "CONNECTED",
                db_time: response.rows[0].now
            });
        } catch (error) {
            res.status(503)({
                status: "ERROR",
                timestamp: new Date().toISOString(),
                database: "disconnected",
                error: error.message,
            });
        }
    }
}

module.exports = controllers;