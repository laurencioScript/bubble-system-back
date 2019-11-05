const connect = require('../../database');


const createUsers =  async (user) => {
  try{
    
    await connect.query(`insert into usuario (nome,senha,email,nivel) values 
         ('${user.name}','${user.password}','${user.email}','${user.level}') `);

    return {"success":true};
  }
  catch(error){
    console.log("Database Error: ", error);
    return error
  }
  

}


const getUsers = async () => {
  
  try{
    return await connect.query('select * from usuario');
    
  }
  catch(error){
    console.log("Database Error: ", error)
    return error;
  }
  
}

const getUser = async (userId) => {
  
  try{
    
    return await connect.query(`select * from usuario where id_usuario = '${userId}'`);
  
  }
  catch(error){
    console.log("Database Error: ", error)
    return error;
  }

}


const updateUser = async (user) => {

  try{
    let query = `UPDATE usuario SET nome = '${user.name}', email = '${user.email}', nivel = '${user.level}'   `;
    query += (user.password != '')?`, senha = '${user.password}' WHERE id_usuario = '${user.id}'` :`WHERE id_usuario = '${user.id}'`;  
    await connect.query(query);
    return {"success":true};
  }
  catch(error){
    console.log("Database Error: ", error)
    return error;
  }

  
}


const deleteUser = async (userId) => {

  try{
    await connect.query(`DELETE FROM usuario WHERE id_usuario = '${userId}' `);
    return {"success":true};
  }
  catch(error){
    console.log("Database Error: ", error)
    return error;
  }

  
}

module.exports = {createUsers,getUser,getUsers,updateUser,deleteUser};