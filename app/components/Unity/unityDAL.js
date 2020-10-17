const {connect} = require('./../../../database');
const uuidV4 = require('uuid/v4');

const createUnity =  async (unity) => {
  const client = connect();
  try{
    
   return await client.query(`insert into unity values 
         ('${unity.id}','${unity.name}') `);
  }
  catch(error){
    throw error;   
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
      query += 'where ';
      query += values.name ? `unity_name like '%${values.name}%' ` :""
    }

    query += `order by unity_name desc  `;

    return await client.query(query);    
  }
  catch(error){
    throw error;   
  }
  finally{
    client.end();
  }
  
}

const getUnity = async (unityId) => {
  const client = connect();
  try{
    
    return await client.query(`select * from unity where id_unity = '${unityId}'`);
  
  }
  catch(error){
    throw error;   
  }
  finally{
    client.end();
  }

}


const updateUnity = async (unity) => {
  const client = connect();
  try{
   
    return await client.query(`UPDATE unity SET unity_name = '${unity.name}' where id_unity = '${unity.id}' `);
  
  }
  catch(error){
    throw error;   
  }
  finally{
    client.end();
  }

  
}


const deleteUnity = async (unityId) => {
  const client = connect();
  try{
    
    return await client.query(`DELETE FROM unity WHERE id_unity = '${unityId}' `);

  }
  catch(error){
    throw error;   
 
  }
  finally{
    client.end();
  }

  
}

module.exports = {createUnity,getUnity,getUnitys,updateUnity,deleteUnity};