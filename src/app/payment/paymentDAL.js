const {connect} = require('./../../../database');
const uuidV4 = require('uuid/v4');


const createPayment =  async (payment) => {
  
  const client = connect();
  try{
 
    return  await client.query(`insert into payment  values 
         ('${payment.id}','${payment.debit_card || 0 }',
         '${payment.credit_card || 0 }','${payment.check_pay || 0 }','${payment.money_pay || 0 }',
         '${payment.discount || 0 }','${payment.amount_paid || 0 }','${payment.value_total || 0 }','${payment.interest || 0 }') `);

  }
  catch(error){
    throw error;   
  }
  finally{
    
    client.end();
  }

}

const getPayments = async (values) => {
  const client = connect();
  try{
    
    return await client.query(`select * from payment order by amount_paid desc  `);
   
  }
  catch(error){
    throw error;   
  }
  finally{
    
    client.end();
  }
}

const getPayment = async (paymentId) => {
  const client = connect();
  try{
    
    return await client.query(`select * from payment where id_payment = '${paymentId}'`);
   
  }
  catch(error){
    throw error;   
  }
  finally{
    
    client.end();
  }
}


const updatePayment = async (payment) => {
  const client = connect();
  try{

    let update = "";
    
    update += payment.debit_card != undefined ? `debit_card = '${payment.debit_card}' ` : ``;
    update += payment.debit_card != undefined ? ", ":"";
    update += payment.credit_card != undefined ? `credit_card = '${payment.credit_card}'` : ``;
    update += payment.credit_card != undefined ? ", ":"";
    update += payment.check_pay != undefined ? `check_pay = '${payment.check_pay}' ` : ``;
    update += payment.check_pay != undefined ? ", ":"";
    update += payment.money_pay != undefined ? `money_pay = '${payment.money_pay}'` : ``;
    update += payment.money_pay != undefined ? ", ":"";
    update += payment.discount != undefined ? `discount = '${payment.discount}'` : ``;
    update += payment.discount != undefined ? ", ":"";
    update += payment.interest != undefined ? `interest = '${payment.interest}'` : ``;
    update += payment.interest != undefined ? ", ":"";
    update += payment.amount_paid != undefined ? `amount_paid = '${payment.amount_paid}'` : ``;
    update += payment.amount_paid != undefined ? ", ":"";
    update += payment.value_total != undefined ? `value_total = '${payment.value_total}'` : ``;
    
    
    return await client.query(`UPDATE payment 
    SET ${update}
    where id_payment = '${payment.id || payment.id_payment}' `);
    
    
  
  }
  catch(error){
    
    throw error;   
  }
  finally{
    
    client.end();
  }
  
}


const deletePayment = async (paymentId) => {
  const client = connect();
  try{
    
    return await client.query(`DELETE FROM payment WHERE id_payment = '${paymentId}' `);

  }
  catch(error){
    throw error;   
  }
  finally{
    
    client.end();
  }
  
}

module.exports = {createPayment,updatePayment,getPayment,deletePayment,getPayments};
