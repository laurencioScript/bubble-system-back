const {connect} = require('./../../../database');
const Item = require('./../Item/itemDAL');

const createService =  async (service) => {
    const {pagamento,items} = service;
    const client = connect;
    
    try {
        await client.query('BEGIN');

        // SAFE ZONE

        await client.query(`insert into pagamento (cartao_debito,cartao_credito,cheque,
        dinheiro,desconto,valor_pago,valor_total) 
        values ('${pagamento.cartao_debito}','${pagamento.cartao_credito}',
        '${pagamento.cheque}','${pagamento.dinheiro}','${pagamento.desconto}',
        '${pagamento.valor_pago}','${pagamento.valor_total}')`)

        const pagamentoId = await client.query('select MAX(id_pagamento) from pagamento');

        await client.query(`insert into servico (pagamento_id,data_entrada,data_entrega,data_pagamento,
        data_retirada,observacao,situacao,cliente) 
        values ('${pagamentoId.rows[0].max}','${service.data_entrada}','${service.data_entrega}',
        '${service.data_pagamento}','${service.data_retirada}',
        '${service.observacao}','${service.situacao}', '${JSON.stringify(service.cliente)}') `);

        const serviceId = await client.query('select MAX(id_servico) from servico');
        console.log(serviceId.rows[0].max)
        for(let item of items){
            await Item.createItem({
              "servico_id":serviceId.rows[0].max,
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
  

}


const getAllServices = async () => {
  
  try{

    const result =  await connect.query('select * from servico join pagamento on id_pagamento = id_servico');
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
  
}

const getOneService = async (serviceId) => {
  
  try{
    
    const result =  await connect.query(`select * from servico join pagamento on id_pagamento = id_servico where id_servico = '${serviceId}' `);
    const services= result.rows;
    for(let service of services){
      const items = await connect.query(`select * from item where id_item = ${service.id_servico}`)
      service.items = items.rows;
    }
    return {"result":services};
  }
  catch(error){
    console.log("Database Error: ", error)
    return {"error":error};
  }

}


const updateService = async (service) => {

  console.log(service)

  try{
    
    const {pagamento} = service;

    const resultPagamento = await connect.query(`UPDATE pagamento 
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

    const resultServico = await connect.query(`UPDATE servico SET
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

  
}


const deleteService = async (servicoId) => {

  try{

    const infoService = await getOneService(servicoId);
    if(infoService.result.length < 1)
      return  {"error":"Not found service "}; 

    let id_pagamento = infoService.result[0].pagamento_id;

    for(let item of infoService.result[0].items){
      await Item.deleteItem(item.id_item)
    }


    const resultService = await connect.query(`DELETE FROM servico WHERE id_servico = '${servicoId}' `);
 
    if(resultService.rowCount < 1 )
      return  {"error":"Not found 'service' "}; 

    const resultPagamento = await connect.query(`DELETE FROM pagamento WHERE id_pagamento = '${id_pagamento}' `);

    if(resultPagamento.rowCount < 1 )
    return  {"error":"Not found 'pagamento' "}; 

    return {"result":true};

  }
  catch(error){
 
    console.log("Delete DATABASE Error: ", error)
    return {"error":error};
 
  }

  
}

module.exports = {createService,getOneService,getAllServices,updateService,deleteService};