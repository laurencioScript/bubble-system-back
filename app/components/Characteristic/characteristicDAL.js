const {connect} = require('./../../../database');
const uuidV4 = require('uuid/v4');

const createCharacteristic =  async (charac) => {
  const client = connect();
  try{
    
    return await client.query(`insert into characteristic values 
         ('${charac.id}','${charac.name}') `);
  }
  catch(error){
    throw error;   
  }
  finally{
    client.end();
  }

}


const getCharacteristics = async (values) => {
  const client = connect();
  try{

    let where = (values.name) ? ` where characteristic_name like '%${values.name}%' ` : "";
    
    return  await client.query(`select * from characteristic  ${where} order by characteristic_name desc limit '${values.limit}' offset '${values.offset}'`);
    
  }
  catch(error){
    throw error;   
  }
  finally{
    client.end();
  }
}

const getCharacteristic = async (characId) => {
  const client = connect();
  try{
    
    return await client.query(`select * from characteristic where id_characteristic = '${characId}'`);
   
  }
  catch(error){
    throw error;   
  }
  finally{
    client.end();
  }
}


const updateCharacteristic = async (charac) => {
  const client = connect();
  try{

    return await client.query(`UPDATE characteristic 
    SET characteristic_name = '${charac.name}'
    where id_characteristic = '${charac.id}' `); 

  }
  catch(error){
    throw error;   
  }
  finally{
    client.end();
  }
}


const deleteCharacteristic = async (characId) => {
  const client = connect();
  try{

    return await client.query(`DELETE FROM characteristic WHERE id_characteristic = '${characId}' `);
 

  }
  catch(error){
    throw error;   
  }
  finally{
    client.end();
  }
}

module.exports = {createCharacteristic,getCharacteristic,getCharacteristics,updateCharacteristic,deleteCharacteristic};