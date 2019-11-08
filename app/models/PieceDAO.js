const connect = require('../../database');


const createPiece =  async (piece) => {
  try{
    
    await connect.query(`insert into peca (peca,unidade,valor) values 
         ('${piece.peca}','${piece.unidade}','${piece.valor}') `);

    return {"result":true};
  }
  catch(error){
    console.log("Database Error: ", error);
    return {"error":error};
  }
  

}


const getPieces = async () => {
  
  try{

    const result =  await connect.query('select * from peca');
    return {"result":[result.rows]};
  }
  catch(error){
    console.log("Database Error: ", error)
    return {"error":error};
  }
  
}

const getPiece = async (pieceId) => {
  
  try{
    
    const result = await connect.query(`select * from peca where id_peca = '${pieceId}'`);
    return {"result":[result.rows]};
  }
  catch(error){
    console.log("Database Error: ", error)
    return {"error":error};
  }

}


const updatePiece = async (piece) => {

  try{

    const result = await connect.query(`UPDATE peca 
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

  
}


const deletePiece = async (pieceId) => {

  try{

    const result = await connect.query(`DELETE FROM peca WHERE id_peca = '${pieceId}' `);
    
    return (result.rowCount > 0) ? {"result":true}: {"error":"Not found"};
    

  }
  catch(error){
 
    console.log("Delete DATABASE Error: ", error)
    return {"error":error};
 
  }

  
}

module.exports = {createPiece,getPiece,getPieces,updatePiece,deletePiece};