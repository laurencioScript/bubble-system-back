const {connect} = require('./../../../database');
const uuidV4 = require('uuid/v4');

const createUsers =  async (user) => {
  try{
    
    await connect.query(`insert into usuario values 
         ('${uuidV4()}','${user.name}','${user.password}','${user.email}','${user.level}') `);

    return {"result":true};
  }
  catch(error){
    console.log("Database Error: ", error);
    return {"error":error};
  }
  

}


const getUsers = async () => {
  
  try{

    const users =  await connect.query('select id_usuario,nome,email,nivel from usuario');
    return {"result":[users.rows]};
  }
  catch(error){
    console.log("Database Error: ", error)
    return {"error":error};
  }
  
}

const getUser = async (userId) => {
  
  try{
    
    const user = await connect.query(`select id_usuario,nome,email,nivel from usuario where id_usuario = '${userId}'`);
    return {"result":[user.rows]};
  }
  catch(error){
    console.log("Database Error: ", error)
    return {"error":error};
  }

}


const updateUser = async (user) => {

  try{
    
    let query = `UPDATE usuario SET nome = '${user.name}', email = '${user.email}', nivel = '${user.level}'   `;
    
    query += (user.password != '')?`, senha = '${user.password}' WHERE id_usuario = '${user.id}'` :`WHERE id_usuario = '${user.id}'`;  
    
    const result = await connect.query(query);
    
    return (result.rowCount > 0) ? {"result":true}: {"error":"Not found"};
  
  }
  catch(error){
    console.log("Database Error: ", error)
    return {"error":error};
  }

  
}


const deleteUser = async (userId) => {

  try{

    const result = await connect.query(`DELETE FROM usuario WHERE id_usuario = '${userId}' `);
    
    return (result.rowCount > 0) ? {"result":true}: {"error":"Not found"};
    

  }
  catch(error){
 
    console.log("Delete DATABASE Error: ", error)
    return {"error":error};
 
  }

  
}

const loginUser = async (user)=>{
  try{
    console.log(user);
    const result = await connect.query(`SELECT id_usuario,nome,email,nivel,senha FROM usuario WHERE email = '${user.email}'  `);  
    
    return result;    

  }
  catch(error){
    console.log("Login DATABASE errror: ",error);
    return {"error":error}
  }
}

module.exports = {createUsers,getUser,getUsers,updateUser,deleteUser,loginUser};