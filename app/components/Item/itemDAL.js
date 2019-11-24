const {connect} = require('./../../../database');
const uuidV4 = require('uuid/v4');

const createItem  = async(item) => {
    console.log(item)
    const client = connect();
    try {
        await client.query('BEGIN');

        await client.query(`insert into item  
            values ('${uuidV4()}','${item.servico_id}','${item.quantidade}','${item.unidade}',
            '${item.valor_unitario}','${item.valor_total}',
            '${item.peca}', '${JSON.stringify(item.cores)}', 
            '${JSON.stringify(item.defeitos)}',
            '${JSON.stringify(item.caracteristicas)}')`)

        await client.query('COMMIT');
        return {"result":true};

    } catch (error) {
    
        await client.query('ROLLBACK');
        console.log("Database Error: ", error);
        return {"error":error};
    }
    client.end();

}


const getAllItems = async () => {
  const client = connect();
  try{

    const result =  await client.query('select * from item');
    
    return {"result":result.rows};
  }
  catch(error){
    console.log("Database Error: ", error)
    return {"error":error};
  }
  client.end();
}

const getOneItem = async (itemId) => {
  const client = connect();
  try{
    
    const result =  await client.query(`select * from item where id_item = '${itemId}' `);

    return {"result":result.rows};
  }
  catch(error){
    console.log("Database Error: ", error)
    return {"error":error};
  }
client.end();
}


const updateItems = async (item) => {
  const client = connect();
  try{
    console.log(item)
    const result = await client.query(`update item SET
    quantidade ='${item.quantidade}',
    unidade ='${item.unidade}', valor_unitario ='${item.valor_unitario}',
    valor_total='${item.valor_total}', peca = '${item.peca}', 
    defeitos ='${JSON.stringify(item.defeitos)}',cores = '${JSON.stringify(item.cores)}',
    caracteristicas = '${JSON.stringify(item.caracteristicas)}' where id_item = '${item.id}'
    `);


    return (result.rowCount > 0 ) ? {"result":true}: {"error":"Not found"};
  
  }
  catch(error){
    console.log("Database Error: ", error)
    return {"error":error};
  }
client.end();
  
}


const deleteItem = async (itemId) => {
  const client = connect();
  try{

    const result = await client.query(`DELETE FROM item WHERE id_item = '${itemId}' `);
    
    return (result.rowCount > 0) ? {"result":true}: {"error":"Not found"};
    

  }
  catch(error){
 
    console.log("Delete DATABASE Error: ", error)
    return {"error":error};
 
  }
client.end();
  
}

module.exports = {createItem,getOneItem,getAllItems,updateItems,deleteItem};