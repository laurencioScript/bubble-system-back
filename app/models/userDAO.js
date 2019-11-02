const connect = require('../../database');


const createUsers =  async (user) => {
  try{
    
    return await connect.query(`insert into usuario (nome,senha,email,nivel) values 
         ('${user.name}','${user.password}','${user.email}','${user.level}') `);
  }
  catch(error){
    console.log("Database Error: ", error)
  }
  

}


const getUsers = async () => {
  
  try{
    return await connect.query('select * from usuario');
  }
  catch(error){
    console.log("Database Error: ", error)
  }
  
}

const getUser = async (userId) => {
  
  try{
    console.log(userId)
    return await connect.query(`select * from usuario where id_usuario = '${userId}'`);
  
  }
  catch(error){
    console.log("Database Error: ", error)
  }

}


const updateUser = async (user) => {

  try{
    return await connect.query(`UPDATE usuario SET nome = '${user.name}', senha = '${user.password}' , email = '${user.email}' , nivel = '${user.level}'  WHERE id_usuario = '${user.id}' `);
  
  }
  catch(error){
    console.log("Database Error: ", error)
  }

  
}


const deleteUser = async (userId) => {

  try{
    return await connect.query(`DELETE FROM usuario WHERE id_usuario = '${userId}' `);
  }
  catch(error){
    console.log("Database Error: ", error)
  }

  
}

module.exports = {createUsers,getUser,getUsers,updateUser,deleteUser};