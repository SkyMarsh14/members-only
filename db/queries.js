const pool = require("./pool");

const queries = {
  addUser: async (username, firstName, lastName, password) => {
    await pool.query(
      'INSERT INTO users(username,"firstName","lastName",password) VALUES ($1,$2,$3,$4)',
      [username, firstName, lastName, password]
    );
  },
  searchUser: async (username) => {
    const data = await pool.query(`SELECT * from users WHERE username=$1`, [
      username,
    ]);
    return data.rows[0];
  },
};

module.exports = queries;
