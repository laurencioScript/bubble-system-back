const {connect} = require('./../../../database');
const uuidV4 = require('uuid/v4');

const createPiece =  async (piece) => {
  const client = connect();
  try{

    return await client.query(`insert into piece values 
         ('${piece.id}','${piece.name}','${piece.unity}','${piece.value}') `);

  }
  catch(error){
    throw error;   
  }
  finally{
    client.end();
  }

}


const getPieces = async (values) => {
  const client = connect();
  try{

    let query = 'select * from piece ';
    if(values.name || values.unity ||  values.value){
      query += 'where ';
      query += values.name ? `piece_name like '%${values.name}%' ` :"";
      query += values.name ? `unity like '%${values.unity}%' ` :"";
      query += values.name ? `value like '%${values.value}%' ` :"";
    }

    query += `order by piece_name desc  `;

    return await client.query(query);    
    
  }
  catch(error){
    throw error;   
  }
  finally{
    client.end();
  }
}

const getPiece = async (pieceId) => {
  const client = connect();
  try{
    
    return await client.query(`select * from piece where id_piece = '${pieceId}'`);
    
  }
  catch(error){
    throw error;   
  }
  finally{
    client.end();
  }
}


const updatePiece = async (piece) => {
  const pieceExist = await getPiece(piece.id);

  const client = connect();
  try{

    let query = `UPDATE piece SET piece_name = '${piece.name ? piece.name : pieceExist.name }', unity = '${piece.unity ? piece.unity : pieceExist.unity}', value = ${piece.value ? piece.value : pieceExist.value} WHERE id_piece = '${piece.id}'`;
  
    
    return await client.query(query);   
  }
  catch(error){
    throw error;   
  }
  finally{
    client.end();
  }
  
}


const deletePiece = async (pieceId) => {
  const client = connect();
  try{

    return await client.query(`DELETE FROM piece WHERE id_piece = '${pieceId}' `);
  
  }
  catch(error){
    throw error;   
  }
  finally{
    
    client.end();
  }
  
}

module.exports = {createPiece,getPiece,getPieces,updatePiece,deletePiece};