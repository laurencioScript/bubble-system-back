const {connect} = require('./../../../database');
const uuidV4 = require('uuid/v4');

const createCharacteristic =  async (charac) => {
  const client = connect();
  try{
    
    await client.query(`insert into caracteristica values 
         ('${uuidV4()}','${charac.caracteristica}') `);

    return {"result":true};
  }
  catch(error){
    console.log("Database Error: ", error);
    return {"error":error};
  }
  client.end();

}


const getCharacteristics = async () => {
  const client = connect();
  try{

    const result =  await client.query('select * from caracteristica');
    return {"result":result.rows};
  }
  catch(error){
    console.log("Database Error: ", error)
    return {"error":error};
  }
  client.end();
}

const getCharacteristic = async (characId) => {
  const client = connect();
  try{
    
    const result = await client.query(`select * from caracteristica where id_caracteristica = '${characId}'`);
    return {"result":result.rows};
  }
  catch(error){
    console.log("Database Error: ", error)
    return {"error":error};
  }
  client.end();
}


const updateCharacteristic = async (charac) => {
  const client = connect();
  try{

    const result = await client.query(`UPDATE caracteristica 
    SET caracteristica = '${charac.caracteristica}'
    where id_caracteristica = '${charac.id}' `);
    
    return (result.rowCount > 0) ? {"result":true}: {"error":"Not found"};
  
  }
  catch(error){
    console.log("Database Error: ", error)
    return {"error":error};
  }
client.end();
  
}


const deleteCharacteristic = async (characId) => {
  const client = connect();
  try{

    const result = await client.query(`DELETE FROM caracteristica WHERE id_caracteristica = '${characId}' `);
    
    return (result.rowCount > 0) ? {"result":true}: {"error":"Not found"};
    

  }
  catch(error){
 
    console.log("Delete DATABASE Error: ", error)
    return {"error":error};
 
  }
client.end();
  
}

module.exports = {createCharacteristic,getCharacteristic,getCharacteristics,updateCharacteristic,deleteCharacteristic};