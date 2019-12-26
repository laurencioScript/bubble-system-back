const {connect} = require('./../../../database');
const uuidV4 = require('uuid/v4');


const createPayment =  async (payment) => {
  const client = connect();
  try{
 
    return  await client.query(`insert into payment  values 
         ('${payment.id}','${payment.debit_card || 0 }',
         '${payment.credit_card || 0 }','${payment.check_pay || 0 }','${payment.money_pay || 0 }',
         '${payment.discount || 0 }','${payment.amount_paid || 0 }','${payment.value_total || 0 }') `);

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
    
    return await client.query(`select * from payment order by amount_paid desc limit '${values.limit}' offset '${values.offset}'`);
   
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
    
    update += payment.debit_card ? `debit_card = ${payment.debit_card}` : ``;
    update += payment.debit_card != "" ? ", ":"";
    update += payment.credit_card ? `credit_card = ${payment.credit_card}` : ``;
    update += payment.credit_card != "" ? ", ":"";
    update += payment.check_pay ? `check_pay = ${payment.check_pay}` : ``;
    update += payment.check_pay != "" ? ", ":"";
    update += payment.money_pay ? `money_pay = ${payment.money_pay}` : ``;
    update += payment.money_pay != "" ? ", ":"";
    update += payment.discount ? `discount = ${payment.discount}` : ``;
    update += payment.discount != "" ? ", ":"";
    update += payment.amount_paid ? `amount_paid = ${payment.amount_paid}` : ``;
    update += payment.amount_paid != "" ? ", ":"";
    update += payment.value_total ? `value_total = ${payment.value_total}` : ``;
    console.log(update);
    
    return await client.query(`UPDATE payment 
    SET ${update}
    where id_payment = '${payment.id}' `);
    
    
  
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
