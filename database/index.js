const Client = require("pg").Client;
const connect = () => {
  return new Client({
    connectionString: "postgres://kdnbakozvszrvp:778ef3c70d200104b95e89d58ba61f0216ba79ad8c3418cdb67027fb156bfa7f@ec2-18-206-84-251.compute-1.amazonaws.com:5432/df2qkb2n05ro5a",
    ssl: true
  })
};


module.exports = { connect };
