const Client = require("pg").Client;
const connect = () => {
  return new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true
  })
};


module.exports = { connect };
