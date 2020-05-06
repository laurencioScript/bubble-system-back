require('dotenv/config');

const Pool = require("pg").Pool;
const connect = () => {
  return new Pool({
    user: process.env.PRODUCTION == 'true' ? process.env.USER : "postgres",
    host: process.env.PRODUCTION == 'true' ?  process.env.HOST : "127.0.0.1",
    database: process.env.PRODUCTION == 'true' ? process.env.DATABASE : "lavanderia",
    password: process.env.PRODUCTION == 'true' ? process.env.PASSWORD : "root",
    port: 5432,
  });
};


module.exports = { connect };
