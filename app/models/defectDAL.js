const connect = require('../../database');


const createDefect =  async (defect) => {
  try{
    
    await connect.query(`insert into defeito (defeito) values 
         ('${defect.defect}') `);

    return {"result":true};
  }
  catch(error){
    console.log("Database Error: ", error);
    return {"error":error};
  }
  

}


const getDefects = async () => {
  
  try{

    const result =  await connect.query('select * from defeito');
    return {"result":[result.rows]};
  }
  catch(error){
    console.log("Database Error: ", error)
    return {"error":error};
  }
  
}

const getDefect = async (defectId) => {
  
  try{
    
    const result = await connect.query(`select * from defeito where id_defeito = '${defectId}'`);
    return {"result":[result.rows]};
  }
  catch(error){
    console.log("Database Error: ", error)
    return {"error":error};
  }

}


const updateDefect = async (defect) => {

  try{

    const result = await connect.query(`UPDATE defeito 
    SET defeito = '${defect.defect}'
    where id_defeito = '${defect.id}' `);
    
    return (result.rowCount > 0) ? {"result":true}: {"error":"Not found"};
  
  }
  catch(error){
    console.log("Database Error: ", error)
    return {"error":error};
  }

  
}


const deleteDefect = async (defectId) => {

  try{

    const result = await connect.query(`DELETE FROM defeito WHERE id_defeito = '${defectId}' `);
    
    return (result.rowCount > 0) ? {"result":true}: {"error":"Not found"};
    

  }
  catch(error){
 
    console.log("Delete DATABASE Error: ", error)
    return {"error":error};
 
  }

  
}

module.exports = {createDefect,getDefect,getDefects,updateDefect,deleteDefect};