const Pool = require("pg").Pool;
const connect = () => {
  new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  })
};


module.exports = { connect };
