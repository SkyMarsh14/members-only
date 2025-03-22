const pool = require("./pool");
const queries = {
  addUser: async (username, firstName, lastName, password) => {
    const match = await pool.query(`SELECT * FROM users WHERE username=$1`, [
      username,
    ]);
    if (match.rowCount > 0) {
      throw new Error("Username already in use.");
    }
    await pool.query(
      'INSERT INTO users(username,"firstName","lastName",password) VALUES ($1,$2,$3,$4)',
      [username, firstName, lastName, password]
    );
  },
  searchUser: async (username) => {
    return await pool.query(`SELECT * from users WHERE username=$1`, [
      username,
    ]);
  },
  searchUserById: async (id) => {
    const data = await pool.query(`SELECT * from users WHERE id=$1`, [id]);
    return data.rows[0];
  },
  giveMembership: async (id) => {
    await pool.query(`UPDATE users SET "hasMembership"=true WHERE id=$1`, [id]);
  },
};

module.exports = queries;
