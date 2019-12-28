const { connect } = require('./../../../database');
const Payment = require('./../Payment/paymentDAL');

const createService = async (service) => {

  const client = connect();
  const payment = service.payment;
  
  try {

    await client.query('BEGIN');

    await Payment.createPayment(payment);

    const result = await client.query(`insert into service 
    values ('${service.id}','${payment.id}','${service.date_input}',
    '${service.date_ouput}','${service.date_payment}','${service.date_removed}',
    '${service.observation}','${service.situation}','${JSON.stringify(service.client)}')`);


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


const getAllServices = async () => {
  
  const client = connect();
  
  try {
    
    return await client.query('select * from service join payment on payment.id_payment = service.payment_id');

  }
  catch (error) {
    throw error;
  }
  finally {

    client.end();
  }

}

const getOneService = async (serviceId) => {
  
  const client = connect();
  
  try {
  
    return await client.query(`select * from service join payment on id_payment = payment_id where id_service = '${serviceId}' `);
    
  }
  catch (error) {
    throw error;
  }
  finally {

    client.end();
  }
}


const updateService = async (service) => {

  
  const client = connect();
  try {
    
    let serviceExist = await getOneService(service.id_service);
    serviceExist = serviceExist.rows[0];
    const payment = service.payment;
    
    return await client.query(`UPDATE service SET
    date_input = '${service.date_input || serviceExist.date_input}', 
    date_ouput = '${service.date_ouput || serviceExist.date_ouput}',
    date_payment = '${service.date_payment || serviceExist.date_payment}',
    date_removed = '${service.date_removed || serviceExist.date_removed}', 
    observation = '${service.observation || serviceExist.observation}', 
    situation = '${service.situation || serviceExist.situation}', 
    client = '${JSON.stringify(service.client || serviceExist.client)}'
    where id_service = '${service.id_service }' `);
    

  }
  catch (error) {
    throw error;
  }
  finally {

    client.end();
  }

}


const deleteService = async (serviceId) => {
  const client = connect();
  try {
    
    const service = await getOneService(serviceId);
    
    const result = await client.query(`DELETE FROM service WHERE id_service = '${serviceId}' `);
    
    await Payment.deletePayment(service.rows[0].payment_id);
    
    return result;

  }
  catch (error) {
    throw error;
  }
  finally {

    client.end();
  }

}

module.exports = { createService, getOneService, getAllServices, updateService, deleteService };