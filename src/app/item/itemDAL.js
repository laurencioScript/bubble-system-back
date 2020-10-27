const { connect } = require('./../../../database');


const createItem = async (item) => {

  const client = connect();
  try {

    await client.query('BEGIN');
    
    const result = await client.query(`insert into item  
    (id_item, service_id, piece, amount, unity, value_unity, value_total, colors, defects, characteristics)
    values ('${item.id}','${item.service_id}','${item.piece}','${item.amount}','${item.unity}',
    '${item.value_unity}','${item.value_total}','${JSON.stringify(item.colors)}', 
    '${JSON.stringify(item.defects)}',
    '${JSON.stringify(item.characteristics)}')`)

    await client.query('COMMIT');

    return result;

  }
  catch (error) {

    throw error;
  
  }
  finally {

    client.end();

  }

}


const getAllItems = async (values) => {
  const client = connect();
  try {
    
    return await client.query(`select * from item 
    where 
        item.service_id  ${values.service_id ? `= '${values.service_id}'  `: "is not null "} 
        order by piece desc  `);


  }
  catch (error) {

    throw error;
  
  }
  finally {

    client.end();

  }
}

const getOneItem = async (itemId) => {
  const client = connect();
  try {

    return await client.query(`select * from item where id_item = '${itemId}' `);

  }
  catch (error) {

    throw error;
  
  }
  finally {

    client.end();

  }
}


const updateItems = async (item) => {
  
  const client = connect();

  try {

    return await client.query(`update item SET
    amount ='${item.amount}',
    unity ='${item.unity}', value_unity ='${item.value_unity}',
    value_total='${item.value_total}', piece = '${item.piece}', 
    defects ='${JSON.stringify(item.defects)}',colors = '${JSON.stringify(item.colors)}',
    characteristics = '${JSON.stringify(item.characteristics)}' where id_item = '${item.id_item}'`);


  }
  catch (error) {

    throw error;
    
    
  }
  finally {

    client.end();

  }

}


const deleteItem = async (itemId) => {
  const client = connect();
  try {

    return await client.query(`DELETE FROM item WHERE id_item = '${itemId}' `);


  }
  catch (error) {

    throw error;
  
  }
  finally {

    client.end();

  }

}

module.exports = { createItem, getOneItem, getAllItems, updateItems, deleteItem };