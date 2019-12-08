const {connect} = require('./../../../database');
const Item = require('./../Item/itemDAL');
const uuidV4 = require('uuid/v4');

const createService =  async (service) => {
    const {pagamento,items} = service;
    const client = connect();
    try {
        await client.query('BEGIN');

        // SAFE ZONE

      let pagamentoID = uuidV4();

        await client.query(`insert into pagamento 
        values ('${pagamentoId}','${pagamento.cartao_debito}','${pagamento.cartao_credito}',
        '${pagamento.cheque}','${pagamento.dinheiro}','${pagamento.desconto}',
        '${pagamento.valor_pago}','${pagamento.valor_total}')`)

        let servicoID = uuidV4();

        await client.query(`insert into servico
        values ('${servicoID}','${pagamentoId}','${service.data_entrada}','${service.data_entrega}',
        '${service.data_pagamento}','${service.data_retirada}',
        '${service.observacao}','${service.situacao}', '${JSON.stringify(service.cliente)}') `);

        const serviceId = await client.query('select MAX(id_servico) from servico');
     
        for(let item of items){
            await Item.createItem({
              "servico_id":servicoID,
              "quantidade":item.quantidade,
              "unidade":item.unidade,
              "valor_unitario":item.valor_unitario,
              "valor_total":item.valor_total,
              "peca":item.peca,
              "cores":item.cores,
              "defeitos":item.defeitos,
              "caracteristicas":item.caracteristicas
            })
        }
        

        // SAFE ZONE

        await client.query('COMMIT');
        return {"result":true};

    } catch (error) {
    
        await client.query('ROLLBACK');
        console.log("Database Error: ", error);
        return {"error":error};
    }
    client.end();

}


const getAllServices = async () => {
  const client = connect();
  try{
    const result =  await client.query('select * from servico join pagamento on id_pagamento = id_servico');
    const services= result.rows;

    for(let service of services){
      console.log('service',service);
      const items = await Item.getOneItem(service.id_servico)
      console.log('items',items.result) 
      service.items = items.result;
    }
    return {"result":services};
  }
  catch(error){
    console.log("Database Error: ", error)
    return {"error":error};
  }
  client.end();
  
}

const getOneService = async (serviceId) => {
  const client = connect();
  try{
    const result =  await client.query(`select * from servico join pagamento on id_pagamento = id_servico where id_servico = '${serviceId}' `);
    const services= result.rows;
    for(let service of services){
      const items = await client.query(`select * from item where id_item = ${service.id_servico}`)
      service.items = items.rows;
    }
    return {"result":services};
  }
  catch(error){
    console.log("Database Error: ", error)
    return {"error":error};
  }
  client.end();
}


const updateService = async (service) => {

  console.log(service)
  const client = connect();
  try{
    
    const {pagamento} = service;

    const resultPagamento = await client.query(`UPDATE pagamento 
    SET 
    cartao_debito = ${pagamento.cartao_debito},
    cartao_credito = ${pagamento.cartao_credito}, 
    cheque = ${pagamento.cheque},
    dinheiro = ${pagamento.dinheiro}, 
    desconto = ${pagamento.desconto}, 
    valor_pago = ${pagamento.valor_pago},
    valor_total = ${pagamento.valor_total}
    where id_pagamento = ${pagamento.id} `);
    
    if(resultPagamento.rowCount < 1 )
      return  {"error":"Not found 'pagamento' "}; 


      console.log(`UPDATE servico SET
      data_entrada = '${service.data_entrada}', 
      data_entrega = '${service.data_entrega}',
      data_pagamento = '${service.data_pagamento}',
      data_retirada = '${service.data_retirada}', 
      observacao = '${service.observacao}', 
      situacao = '${service.situacao}', 
      cliente = '${JSON.stringify(service.cliente)}'
      where id_servico = '${service.id_servico}' `)

    const resultServico = await client.query(`UPDATE servico SET
    data_entrada = '${service.data_entrada}', 
    data_entrega = '${service.data_entrega}',
    data_pagamento = '${service.data_pagamento}',
    data_retirada = '${service.data_retirada}', 
    observacao = '${service.observacao}', 
    situacao = '${service.situacao}', 
    cliente = '${JSON.stringify(service.cliente)}'
    where id_servico = '${service.id_servico}' `);
    return (resultServico.rowCount > 0) ? {"result":true}: {"error":"Not found service"};
  
  }
  catch(error){
    console.log("Database Error: ", error)
    return {"error":error};
  }
  client.end();
  
}


const deleteService = async (servicoId) => {
  const client = connect();
  try{

    const infoService = await getOneService(servicoId);
    if(infoService.result.length < 1)
      return  {"error":"Not found service "}; 

    let id_pagamento = infoService.result[0].pagamento_id;

    for(let item of infoService.result[0].items){
      await Item.deleteItem(item.id_item)
    }


    const resultService = await client.query(`DELETE FROM servico WHERE id_servico = '${servicoId}' `);
 
    if(resultService.rowCount < 1 )
      return  {"error":"Not found 'service' "}; 

    const resultPagamento = await client.query(`DELETE FROM pagamento WHERE id_pagamento = '${id_pagamento}' `);

    if(resultPagamento.rowCount < 1 )
    return  {"error":"Not found 'pagamento' "}; 

    return {"result":true};

  }
  catch(error){
 
    console.log("Delete DATABASE Error: ", error)
    return {"error":error};
 
  }
  client.end();
  
}

module.exports = {createService,getOneService,getAllServices,updateService,deleteService};