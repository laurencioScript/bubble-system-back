const {connect} = require('./../../../database');
const uuidV4 = require('uuid/v4');

const createPiece =  async (piece) => {
  const client = connect();
  try{
    await client.query(`insert into peca values 
         ('${uuidV4()}','${piece.peca}','${piece.unidade}','${piece.valor}') `);

    return {"result":true};
  }
  catch(error){
    console.log("Database Error: ", error);
    return {"error":error};
  }
  client.end();

}


const getPieces = async () => {
  const client = connect();
  try{

    const result =  await client.query('select * from peca');
    return {"result":result.rows};
  }
  catch(error){
    console.log("Database Error: ", error)
    return {"error":error};
  }
  client.end();
}

const getPiece = async (pieceId) => {
  const client = connect();
  try{
    
    const result = await client.query(`select * from peca where id_peca = '${pieceId}'`);
    return {"result":result.rows};
  }
  catch(error){
    console.log("Database Error: ", error)
    return {"error":error};
  }
  client.end();
}


const updatePiece = async (piece) => {
  const client = connect();
  try{

    const result = await client.query(`UPDATE peca 
    SET peca = '${piece.peca}', 
    unidade = '${piece.unidade}',
    valor = '${piece.valor}'  
    where id_peca = '${piece.id}' `);
    
    return (result.rowCount > 0) ? {"result":true}: {"error":"Not found"};
  
  }
  catch(error){
    console.log("Database Error: ", error)
    return {"error":error};
  }
  client.end();
  
}


const deletePiece = async (pieceId) => {
  const client = connect();
  try{

    const result = await client.query(`DELETE FROM peca WHERE id_peca = '${pieceId}' `);
    
    return (result.rowCount > 0) ? {"result":true}: {"error":"Not found"};
    

  }
  catch(error){
 
    console.log("Delete DATABASE Error: ", error)
    return {"error":error};
 
  }
  client.end();
  
}

module.exports = {createPiece,getPiece,getPieces,updatePiece,deletePiece};