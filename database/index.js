
const Pool = require('pg').Pool

const connect = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'lavanderia',
  password: 'root',
  port: 5432,
});


module.exports = connect;
