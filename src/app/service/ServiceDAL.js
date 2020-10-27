const { connect } = require("./../../../database");
const Payment = require("./../Payment/paymentDAL");
const Item = require("./../Item/itemDAL");
const uuidV4 = require("uuid/v4");

const createService = async (service) => {
  const client = connect();
  const payment = service.payment;
  const itens = service.itens;

  try {
    await client.query("BEGIN");

    await Payment.createPayment(payment);

    const result = await client.query(
      `INSERT INTO public.service
    (id_service, payment_id, date_input, date_ouput, date_payment, date_removed, observation, situation, client, rol)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`,
      [
        service.id,
        payment.id,
        service.date_input,
        service.date_ouput,
        service.date_payment,
        service.date_removed,
        service.observation,
        service.situation,
        JSON.stringify(service.client),
        service.rol,
      ]
    );

    itens.map(async (item) => {
      item.id = uuidV4();
      item.service_id = service.id;
      await Item.createItem(item);
    });

    await client.query("COMMIT");

    return result;
  } catch (error) {
    throw error;
  } finally {
    client.end();
  }
};

const getAllServices = async () => {
  const client = connect();

  try {
    const result = await client.query("select * from service ");

    for (const service of result.rows) {
      let aux = await Payment.getPayment(service.payment_id);
      service.payment = aux.rowCount > 0 ? aux.rows[0] : null;
    }

    for (const service of result.rows) {
      let aux = await Item.getAllItems({
        service_id: service.id_service,
        limit: 1000,
        offset: 0,
      });

      service.itens = aux.rowCount > 0 ? aux.rows : [];
    }

    return result;
  } catch (error) {
    throw error;
  } finally {
    client.end();
  }
};

const getOneService = async (serviceId) => {
  const client = connect();

  try {
    const result = await client.query(
      `select * from service where id_service = '${serviceId}' `
    );

    for (const service of result.rows) {
      let aux = await Payment.getPayment(service.payment_id);
      service.payment = aux.rowCount > 0 ? aux.rows[0] : null;
    }

    for (const service of result.rows) {
      let aux = await Item.getAllItems({
        service_id: service.id_service,
        limit: 1000,
        offset: 0,
      });

      service.itens = aux.rowCount > 0 ? aux.rows : [];
    }

    return result;
  } catch (error) {
    throw error;
  } finally {
    client.end();
  }
};

const updateService = async (service) => {
  const client = connect();
  try {
    let serviceExist = await getOneService(service.id_service);
    serviceExist = serviceExist.rows[0];
    const payment = service.payment;
    const itens = service.itens;


    let update = `UPDATE public.service
    SET 
      date_input=$2, 
      date_ouput=$3, 
      date_payment=$4, 
      date_removed=$5, 
      observation=$6, 
      situation=$7
    WHERE 
    id_service = $1;`;

    const result = await client.query(update,[
      service.id_service,
      service.date_input,
      service.date_ouput,
      service.date_payment,
      service.date_removed,
      service.observation,
      service.situation
    ]);

    for (const item of itens) {
      await Item.updateItems(item);
    }

    await Payment.updatePayment(payment);

    return result;
  } catch (error) {
    throw error;
  } finally {
    client.end();
  }
};

const deleteService = async (serviceId) => {
  const client = connect();
  try {
    const service = await getOneService(serviceId);

    const itens = await Item.getAllItems({
      service_id: serviceId,
      limit: 1000,
      offset: 0,
    });

    for (const item of itens.rows) {
      await Item.deleteItem(item.id_item);
    }
    const result = await client.query(
      `DELETE FROM service WHERE id_service = '${serviceId}' `
    );

    await Payment.deletePayment(service.rows[0].payment_id);

    return result;
  } catch (error) {
    throw error;
  } finally {
    client.end();
  }
};

module.exports = {
  createService,
  getOneService,
  getAllServices,
  updateService,
  deleteService,
};
