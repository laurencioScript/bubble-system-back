require('dotenv/config');

const Pool = require("pg").Pool;
const connect = () => {
  return new Pool({
    user: process.env.PRODUCTION == 'true' ? process.env.USER : 'postgres' ,
    host: process.env.PRODUCTION == 'true' ?  process.env.HOST :  'localhost' ,
    database: process.env.PRODUCTION == 'true' ? process.env.DATABASE :  'bubbles-system' ,
    password: process.env.PRODUCTION == 'true' ? process.env.PASSWORD : 'root' ,
    port: 5432,
  });
};


module.exports = connect;
