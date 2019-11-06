const connect = require('../../database');


const createUnity =  async (unity) => {
  try{
    
    await connect.query(`insert into unidade (unidade) values 
         ('${unity.unidade}') `);

    return {"result":true};
  }
  catch(error){
    console.log("Database Error: ", error);
    return {"error":error};
  }
  

}


const getUnitys = async () => {
  
  try{

    const unity =  await connect.query('select * from unidade');
    return {"result":[unity.rows]};
  }
  catch(error){
    console.log("Database Error: ", error)
    return {"error":error};
  }
  
}

const getUnity = async (unityId) => {
  
  try{
    
    const unity = await connect.query(`select * from unidade where id_unidade = '${unityId}'`);
    return {"result":[unity.rows]};
  }
  catch(error){
    console.log("Database Error: ", error)
    return {"error":error};
  }

}


const updateUnity = async (unity) => {

  try{

    const result = await connect.query(`UPDATE unidade SET unidade = '${unity.unidade}' where id_unidade = '${unity.id}' `);
    
    return (result.rowCount > 0) ? {"result":true}: {"error":"Not found"};
  
  }
  catch(error){
    console.log("Database Error: ", error)
    return {"error":error};
  }

  
}


const deleteUnity = async (unityId) => {

  try{

    const result = await connect.query(`DELETE FROM unidade WHERE id_unidade = '${unityId}' `);
    
    return (result.rowCount > 0) ? {"result":true}: {"error":"Not found"};
    

  }
  catch(error){
 
    console.log("Delete DATABASE Error: ", error)
    return {"error":error};
 
  }

  
}

module.exports = {createUnity,getUnity,getUnitys,updateUnity,deleteUnity};