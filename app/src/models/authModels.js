const bcrypt = require("bcryptjs");
const pool = require("../config/database")

const authModels = {

  createUser: async ({email, password}) => {
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO users (email, password)
      VALUES ($1, $2)
      RETURNING id, email, created_at;
    `;

    const result = await pool.query(query, [email, hashedPassword]);

    return result.rows[0];

  },

  findByEmail: async (email) => {
    const query = `SELECT * FROM users WHERE email = $1;`;

    const result = await pool.query(query, [email]);

    return result.rows[0];
  },

  verifyPassword: async ({plain_password, hashed_password}) => {
    return await bcrypt.compare(plain_password, hashed_password)
  }
}

module.exports = authModels;