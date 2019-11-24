const {connect} = require('./../../../database');
const uuidV4 = require('uuid/v4');

const createUsers =  async (user) => {
  try{

    const client = connect();
    
    await client.query(`insert into usuario values 
         ('${uuidV4()}','${user.name}','${user.password}','${user.email}','${user.level}') `);
    client.end();
    return {"result":true};
  }
  catch(error){
    console.log("Database Error: ", error);
    return {"error":error};
  }
}


const getUsers = async () => {
  
  try{

    const client = connect();

    const users =  await client.query('select id_usuario,nome,email,nivel from usuario');
    client.end();
    return {"result":users.rows};
  }
  catch(error){
    console.log("Database Error: ", error)
    return {"error":error};
  }
  
}

const getUser = async (userId) => {
  
  try{
    const client = connect();

    const user = await client.query(`select id_usuario,nome,email,nivel from usuario where id_usuario = '${userId}'`);
    
    client.end();
    
    return {"result":user.rows};
  }
  catch(error){
    console.log("Database Error: ", error)
    return {"error":error};
  }

}


const updateUser = async (user) => {

  try{
    const client = connect();
    let query = `UPDATE usuario SET nome = '${user.name}', email = '${user.email}', nivel = '${user.level}'   `;
    
    query += (user.password != '')?`, senha = '${user.password}' WHERE id_usuario = '${user.id}'` :`WHERE id_usuario = '${user.id}'`;  
    
    const result = await client.query(query);
    client.end();
    return (result.rowCount > 0) ? {"result":true}: {"error":"Not found"};
  
  }
  catch(error){
    console.log("Database Error: ", error)
    return {"error":error};
  }

  
}


const deleteUser = async (userId) => {

  try{
    const client = connect();
    const result = await client.query(`DELETE FROM usuario WHERE id_usuario = '${userId}' `);
    client.end();
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
    const client = connect();
    const result = await client.query(`SELECT id_usuario,nome,email,nivel,senha FROM usuario WHERE email = '${user.email}'  `);  
    client.end();
    return result;    

  }
  catch(error){
    console.log("Login DATABASE error: ",error);
    return {"error":error}
  }
}

module.exports = {createUsers,getUser,getUsers,updateUser,deleteUser,loginUser};