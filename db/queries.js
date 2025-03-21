const pool = require("./pool");

const queries = {
  addUser: async (username, firstName, lastName, password) => {
    await pool.query(
      'INSERT INTO users(username,"firstName","lastName",password) VALUES ($1,$2,$3,$4)',
      [username, firstName, lastName, password]
    );
  },
};

module.exports = queries;
