const {connect} = require('./../../../database');
const uuidV4 = require('uuid/v4');

const createColor =  async (color) => {
  const client = connect();
  try{
    
    await client.query(`insert into cor values 
         ('${uuidV4()}','${color.color}','${color.hexadecimal}') `);

    return {"result":true};
  }
  catch(error){
    console.log("Database Error: ", error);
    return {"error":error};
  }
  client.end();

}


const getColors = async () => {
  const client = connect();
  try{

    const result =  await client.query('select * from cor');
    return {"result":result.rows};
  }
  catch(error){
    console.log("Database Error: ", error)
    return {"error":error};
  }
  client.end();
}

const getColor = async (colorId) => {
  const client = connect();
  try{
    
    const result = await client.query(`select * from cor where id_cor = '${colorId}'`);
    return {"result":result.rows};
  }
  catch(error){
    console.log("Database Error: ", error)
    return {"error":error};
  }
client.end();
}


const updateColor = async (color) => {
  const client = connect();
  try{

    const result = await client.query(`UPDATE cor 
    SET cor_nome = '${color.color}', 
    hexadecimal = '${color.hexadecimal}' 
    where id_cor = '${color.id}' `);
    
    return (result.rowCount > 0) ? {"result":true}: {"error":"Not found"};
  
  }
  catch(error){
    console.log("Database Error: ", error)
    return {"error":error};
  }

  client.end();
}


const deleteColor = async (colorId) => {
  const client = connect();
  try{

    const result = await client.query(`DELETE FROM cor WHERE id_cor = '${colorId}' `);
    
    return (result.rowCount > 0) ? {"result":true}: {"error":"Not found"};
    

  }
  catch(error){
 
    console.log("Delete DATABASE Error: ", error)
    return {"error":error};
 
  }
client.end();
  
}

module.exports = {createColor,getColor,getColors,updateColor,deleteColor};