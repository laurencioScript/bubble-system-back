const {connect} = require('./../../../database');
const uuidV4 = require('uuid/v4');

const createDefect =  async (defect) => {
  const client = connect();
  try{
    
    await client.query(`insert into defeito  values 
         ('${uuidV4()}','${defect.defect}') `);

    return {"result":true};
  }
  catch(error){
    console.log("Database Error: ", error);
    return {"error":error};
  }
  client.end();

}


const getDefects = async () => {
  const client = connect();
  try{

    const result =  await client.query('select * from defeito');
    return {"result":result.rows};
  }
  catch(error){
    console.log("Database Error: ", error)
    return {"error":error};
  }
  client.end();
}

const getDefect = async (defectId) => {
  const client = connect();
  try{
    
    const result = await client.query(`select * from defeito where id_defeito = '${defectId}'`);
    return {"result":result.rows};
  }
  catch(error){
    console.log("Database Error: ", error)
    return {"error":error};
  }
client.end();
}


const updateDefect = async (defect) => {
  const client = connect();
  try{

    const result = await client.query(`UPDATE defeito 
    SET defeito = '${defect.defect}'
    where id_defeito = '${defect.id}' `);
    
    return (result.rowCount > 0) ? {"result":true}: {"error":"Not found"};
  
  }
  catch(error){
    console.log("Database Error: ", error)
    return {"error":error};
  }
client.end();
  
}


const deleteDefect = async (defectId) => {
  const client = connect();
  try{

    const result = await client.query(`DELETE FROM defeito WHERE id_defeito = '${defectId}' `);
    
    return (result.rowCount > 0) ? {"result":true}: {"error":"Not found"};
    

  }
  catch(error){
 
    console.log("Delete DATABASE Error: ", error)
    return {"error":error};
 
  }
client.end();
  
}

module.exports = {createDefect,getDefect,getDefects,updateDefect,deleteDefect};