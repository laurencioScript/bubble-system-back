const connect = require('../../database');


const createColor =  async (color) => {
  try{
    
    await connect.query(`insert into cor (cor_nome,hexadecimal) values 
         ('${color.color}','${color.hexadecimal}') `);

    return {"result":true};
  }
  catch(error){
    console.log("Database Error: ", error);
    return {"error":error};
  }
  

}


const getColors = async () => {
  
  try{

    const result =  await connect.query('select * from cor');
    return {"result":[result.rows]};
  }
  catch(error){
    console.log("Database Error: ", error)
    return {"error":error};
  }
  
}

const getColor = async (colorId) => {
  
  try{
    
    const result = await connect.query(`select * from cor where id_cor = '${colorId}'`);
    return {"result":[result.rows]};
  }
  catch(error){
    console.log("Database Error: ", error)
    return {"error":error};
  }

}


const updateColor = async (color) => {

  try{

    const result = await connect.query(`UPDATE cor 
    SET cor_nome = '${color.color}', 
    hexadecimal = '${color.hexadecimal}' 
    where id_cor = '${color.id}' `);
    
    return (result.rowCount > 0) ? {"result":true}: {"error":"Not found"};
  
  }
  catch(error){
    console.log("Database Error: ", error)
    return {"error":error};
  }

  
}


const deleteColor = async (colorId) => {

  try{

    const result = await connect.query(`DELETE FROM cor WHERE id_cor = '${colorId}' `);
    
    return (result.rowCount > 0) ? {"result":true}: {"error":"Not found"};
    

  }
  catch(error){
 
    console.log("Delete DATABASE Error: ", error)
    return {"error":error};
 
  }

  
}

module.exports = {createColor,getColor,getColors,updateColor,deleteColor};