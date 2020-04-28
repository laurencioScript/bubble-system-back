const Pool = require("pg").Pool;
const connect = () => {
  return new Pool({
    user: "kdnbakozvszrvp",
    host: "ec2-18-206-84-251.compute-1.amazonaws.com",
    database: "df2qkb2n05ro5a",
    password: "778ef3c70d200104b95e89d58ba61f0216ba79ad8c3418cdb67027fb156bfa7f",
    port: 5432,
  });
};


module.exports = { connect };
