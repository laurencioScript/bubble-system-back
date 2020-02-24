const {connect} = require('./../../../database');
const uuidV4 = require('uuid/v4');


const createUsers =  async (user) => {
  
  const client = connect();
  try{

    
    return await client.query(`insert into userx values 
         ('${user.id}','${user.name}','${user.password}','${user.email}','${user.level}') `);
    
  }
  catch(error){
     throw error;   
  }
  finally{
    client.end();
  }
}

const getUsers = async (values) => {
  const client = connect();
  try{

    //select * from userx where name_user like 'oo%' order by name_user desc limit 5 offset 1;
    let query = 'select id_user,name_user,email,level_user from userx ';
    if(values.name || values.level || values.email){
      query += 'where ';
      query += values.name ? `name_user like '%${values.name}%' ` :""
      query += values.email ? `email like '%${values.email}%' ` :""
      query += values.level ? `level_user = '${values.level}' ` : ""
    }

    query += `order by name_user desc limit '${values.limit}' offset '${values.offset}'`;

    return await client.query(query);    
    
  }
  catch(error){
    throw error;   
  }
  finally{
    client.end();
  }
  
}

const getUser = async (userId) => {
  const client = connect();
  try{

    return await client.query(`select id_user,name_user,email,level_user from userx where id_user = '${userId}'`);
    
  }
  catch(error){
    throw error;   
  }
  finally{
    client.end();
  }

}

const updateUser = async (user) => {
  const client = connect();

  try{
    
    let query = `UPDATE userx SET `;
    query += user.name ? ` name_user = '${user.name}' ,` : ""; 
    query += user.email ? ` email = '${user.email}' ,` : ""; 
    query += user.password ? ` password_user = '${user.password}' ,` : ""; 
    query += user.level ? ` level_user = '${user.level}' ` : ""; 
    query += ` WHERE id_user = '${user.id}'`;  
    console.log(query);
    
    return await client.query(query);
  
  }
  catch(error){
      throw error;   
  }
  finally{
    client.end();
  }
  
}


const deleteUser = async (userId) => {
  const client = connect();
  try{
    
    return await client.query(`DELETE FROM userx WHERE id_user = '${userId}' `);
    
  }
  catch(error){
      throw error;   
  }
  finally{
    client.end();
  }

  
}

const loginUser = async (user)=>{
  const client = connect();
  
  try{

    console.log(user);
    
    const result = await client.query(`SELECT id_user,name_user,email,level_user,password_user FROM userx WHERE email = '${user.email}'  `);  

    return result;    

  }
  catch(error){
      throw error;   
  }
  finally{
    client.end();
  }

}

module.exports = {createUsers,getUser,getUsers,updateUser,deleteUser,loginUser};