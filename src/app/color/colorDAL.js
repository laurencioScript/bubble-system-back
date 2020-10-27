const {connect} = require('./../../../database');


const createColor =  async (color) => {
  const client = connect();
  try{
    
    return await client.query(`insert into color values 
         ('${color.id}','${color.name}','${color.hexadecimal}') `);

    
  }
  catch(error){
    throw error;   
  }
  finally{
    
    client.end();
  }

}


const getColors = async (values) => {
  const client = connect();
  try{

    let where = "";
    if(values.name ){
      where += 'where ';
      where += values.name ? `color_name like '%${values.name}%' ` :"";
    }

    

    return await client.query(`select * from color ${where} order by color_name desc   `);
    
  }
  catch(error){
    throw error;   
  }
  finally{
    
    client.end();
  }
}

const getColor = async (colorId) => {
  const client = connect();
  try{
    
    return await client.query(`select * from color where id_color = '${colorId}'`);
    
  }
  catch(error){
    throw error;   
  }
  finally{
    
    client.end();
  }
}


const updateColor = async (color) => {
  const colorExist = getColor(color.id)
  const client = connect();
  try{

    return await client.query(`UPDATE color 
    SET color_name = '${color.name ? color.name : colorExist.name }', 
    hexadecimal = '${color.hexadecimal ? color.hexadecimal : colorExist.hexadecimal }' 
    where id_color = '${color.id}' `);
    
  
  }
  catch(error){
    throw error;   
  }
  finally{
    
    client.end();
  }
}


const deleteColor = async (colorId) => {
  const client = connect();
  try{

    return await client.query(`DELETE FROM color WHERE id_color = '${colorId}' `);

  }
  catch(error){
    throw error;   
  }
  finally{
    
    client.end();
  }
  
}

module.exports = {createColor,getColor,getColors,updateColor,deleteColor};