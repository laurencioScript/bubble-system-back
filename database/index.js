
const Pool = require('pg').Pool;
const ClientDB = require('pg').Client;
const connect = () => {
  return new Pool({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'lavanderia',
    password: 'root',
    port: 5432,
  });
}





const Client = ()=>{
  return new ClientDB({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'lavanderia',
    password: 'root',
    port: 5432,
  });
  
}

module.exports = {connect,Client};
