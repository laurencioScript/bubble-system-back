const Pool = require("pg").Pool;
const connect = () => {
  return process.env.DATABASE_URL ? 
  new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  })
  :
  new Pool({
    user: "postgres",
    host: "127.0.0.1",
    database: "lavanderia",
    password: "root",
    port: 5432,
  });
};


module.exports = { connect };
