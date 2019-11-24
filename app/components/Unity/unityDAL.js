const {connect} = require('./../../../database');
const uuidV4 = require('uuid/v4');

const createUnity =  async (unity) => {
  try{
    const client = connect();
    await client.query(`insert into unidade values 
         ('${uuidV4()}','${unity.unidade}') `);
    client.end();
    return {"result":true};
  }
  catch(error){
    console.log("Database Error: ", error);
    return {"error":error};
  }
}


const getUnitys = async () => {
  
  try{
    const client = connect();
    const unity =  await client.query('select * from unidade');
    client.end();
    return {"result":unity.rows};
  }
  catch(error){
    console.log("Database Error: ", error)
    return {"error":error};
  }
  
}

const getUnity = async (unityId) => {
  
  try{
    const client = connect();
    const unity = await client.query(`select * from unidade where id_unidade = '${unityId}'`);
    client.end();
    return {"result":unity.rows};
  }
  catch(error){
    console.log("Database Error: ", error)
    return {"error":error};
  }

}


const updateUnity = async (unity) => {

  try{
    const client = connect();
    const result = await client.query(`UPDATE unidade SET unidade = '${unity.unidade}' where id_unidade = '${unity.id}' `);
    client.end();
    return (result.rowCount > 0) ? {"result":true}: {"error":"Not found"};
  
  }
  catch(error){
    console.log("Database Error: ", error)
    return {"error":error};
  }

  
}


const deleteUnity = async (unityId) => {

  try{
    const client = connect();
    const result = await client.query(`DELETE FROM unidade WHERE id_unidade = '${unityId}' `);
    client.end();
    return (result.rowCount > 0) ? {"result":true}: {"error":"Not found"};
    

  }
  catch(error){
 
    console.log("Delete DATABASE Error: ", error)
    return {"error":error};
 
  }

  
}

module.exports = {createUnity,getUnity,getUnitys,updateUnity,deleteUnity};