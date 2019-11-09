const {connect} = require('./../../../database');


const createCharacteristic =  async (charac) => {
  try{
    
    await connect.query(`insert into caracteristica (caracteristica) values 
         ('${charac.caracteristica}') `);

    return {"result":true};
  }
  catch(error){
    console.log("Database Error: ", error);
    return {"error":error};
  }
  

}


const getCharacteristics = async () => {
  
  try{

    const result =  await connect.query('select * from caracteristica');
    return {"result":[result.rows]};
  }
  catch(error){
    console.log("Database Error: ", error)
    return {"error":error};
  }
  
}

const getCharacteristic = async (characId) => {
  
  try{
    
    const result = await connect.query(`select * from caracteristica where id_caracteristica = '${characId}'`);
    return {"result":[result.rows]};
  }
  catch(error){
    console.log("Database Error: ", error)
    return {"error":error};
  }

}


const updateCharacteristic = async (charac) => {

  try{

    const result = await connect.query(`UPDATE caracteristica 
    SET caracteristica = '${charac.caracteristica}'
    where id_caracteristica = '${charac.id}' `);
    
    return (result.rowCount > 0) ? {"result":true}: {"error":"Not found"};
  
  }
  catch(error){
    console.log("Database Error: ", error)
    return {"error":error};
  }

  
}


const deleteCharacteristic = async (characId) => {

  try{

    const result = await connect.query(`DELETE FROM caracteristica WHERE id_caracteristica = '${characId}' `);
    
    return (result.rowCount > 0) ? {"result":true}: {"error":"Not found"};
    

  }
  catch(error){
 
    console.log("Delete DATABASE Error: ", error)
    return {"error":error};
 
  }

  
}

module.exports = {createCharacteristic,getCharacteristic,getCharacteristics,updateCharacteristic,deleteCharacteristic};