const { Client } = require('pg'); // imports the pg module
const client = new Client ({
    host:"localhost",
    port:5432,
    database: "postgres",
    user:"postgres",
    password: "messi3214"
});

async function getAllUsers() {
    const { rows } = await client.query(
      `SELECT id, username 
      FROM users;
    `);
  
    return rows;
  }

  async function createUser({ username, password }) {
  try {
    const {rows} = await client.query(`
      INSERT INTO users(username, password) 
      VALUES($1, $2) 
      ON CONFLICT (username) DO NOTHING 
      RETURNING *;
    `, [username, password]);

    return rows;
  } catch (error) {
    throw error;
  }
}

// supply the db name and location of the database
module.exports = {
  client,
  getAllUsers,
  createUser
}
