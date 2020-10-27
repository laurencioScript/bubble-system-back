const connect = require('./../../database');

const createUnity =  async (unity) => {
  const client = connect();
  try{
    
    const queryResult = await client.query(`insert into unity values 
         ('${unity.id}','${unity.name}') returning *`);
    
    if(queryResult.rows.length == 0){
      return {};
    }

    return queryResult.rows[0];
    
  }
  finally{
    client.end();
  }
}


const getUnitys = async (values) => {
  const client = connect();
  try{
   
    let query = 'select * from unity ';

    if(values.name){
      query += values.name ? ` where unity_name like '%${values.name}%' ` : "";
    }

    query += ` order by unity_name desc `;

    const queryResult = await client.query(query);    

    return queryResult.rows;

  }
  finally{
    client.end();
  }
  
}

const getUnity = async (unityId) => {
  const client = connect();
  try{
    
    const queryResult = await client.query(`select * from unity where id_unity = '${unityId}'`);

    if(queryResult.rows.length == 0){
      return {};
    }

    return queryResult.rows[0]
  
  }
  finally{
    client.end();
  }

}


const updateUnity = async (unity) => {
  const client = connect();
  try{
   
    const queryResult = await client.query(`UPDATE unity SET unity_name = '${unity.name}' where id_unity = '${unity.id}' returning *`);
  
    if(queryResult.rows.length == 0){
      return {};
    }

    return queryResult.rows[0];
    
  }
  finally{
    client.end();
  }

  
}


const deleteUnity = async (unityId) => {
  const client = connect();
  try{
    
    const queryResult = await client.query(`DELETE FROM unity WHERE id_unity = '${unityId}' returning *`);

    if(queryResult.rows.length == 0){
      return {};
    }

    return queryResult.rows[0];

  }
  finally{
    client.end();
  }

  
}

module.exports = {createUnity,getUnity,getUnitys,updateUnity,deleteUnity};