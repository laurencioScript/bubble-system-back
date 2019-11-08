const connect = require('../../database');


const createClient =  async ({info,end}) => {
  try{
       
        await connect.query(`insert into cliente_info 
        (cpf_cnpj,tipo,nome,razao_social,email,observacao_descricao,observacao_cor,contato)
        values ('${info.cpf_cnpj}','${info.tipo}','${info.nome}','${info.razao_social}',
        '${info.email}','${info.observacao}','${info.observacao_cor}', ARRAY [${info.contatos}])`);
            
        await connect.query(`insert into cliente_endereco (endereco,numero,complemento,bairro,cidade,estado,cep)
        values ('${end.endereco}','${end.numero}','${end.complemento}','${end.bairro}','${end.cidade}','${end.estado}','${end.cep}')`);

        const idInfo = await connect.query('select MAX(id_cliente_info) from cliente_info');
        
        const idEndereco = await connect.query('select MAX(id_cliente_endereco) from cliente_endereco');

        await connect.query(`insert into cliente (cliente_info_id,cliente_endereco_id) values
        ('${idInfo.rows[0].max}','${idEndereco.rows[0].max}')`);

        return {"result":true};

  }
  catch(error){
    console.log("Database Error: ", error)
    return {"error":error};
  }
  

}


const getClients = async () => {
  
  try{

    const client = await connect.query('select id_cliente,info.cpf_cnpj,info.tipo,info.nome,info.razao_social,info.email,info.observacao_descricao,info.observacao_cor,info.contato,ende.endereco,ende.numero,ende.complemento,ende.bairro,ende.cidade,ende.estado from cliente join cliente_info info on cliente_info_id = info.id_cliente_info join cliente_endereco ende on ende.id_cliente_endereco = cliente_endereco_id ;');

    return {"result":[client.rows]};

  }
  catch(error){
    console.log("Database Error: ", error);
    return {"error":error};
  }
  
}

const getClient = async (clientId) => {
  
  try{

    const client = await connect.query(`select id_cliente,info.cpf_cnpj,info.tipo,info.nome,info.razao_social,info.email,info.observacao_descricao,info.observacao_cor,info.contato,ende.endereco,ende.numero,ende.complemento,ende.bairro,ende.cidade,ende.estado from cliente join cliente_info info on cliente_info_id = info.id_cliente_info join cliente_endereco ende on ende.id_cliente_endereco = cliente_endereco_id  where id_cliente = '${clientId}';`);

    return {"result":[client.rows]};

  }
  catch(error){
    console.log("Database Error: ", error)
    return {"error":error};
  }

}


const updateClient = async (client) => {

  try{
    
    const{info, end} = client;
    
    const ids = await connect.query(`select cliente_info_id, cliente_endereco_id from cliente where id_cliente = '${client.id}' `);
  
    if(ids.rowCount <= 0){
      return {"error":"Not found"};
    }

    await connect.query(`UPDATE cliente_info SET cpf_cnpj = '${info.cpf_cnpj}',
    tipo = '${info.tipo}',nome ='${info.nome}', razao_social = '${info.razao_social}', 
    email = '${info.email}', observacao_descricao = '${info.observacao_desc}',
    observacao_cor = '${info.observacao_cor}', contato = ARRAY ['${info.contatos}']
    WHERE id_cliente_info = '${ids.rows[0].cliente_info_id}' `);
  
    await connect.query(`UPDATE cliente_endereco SET 
    endereco = '${end.endereco}', numero = '${end.numero}', complemento = '${end.complemento}', 
    bairro = '${end.bairro}', cidade = '${end.cidade}', estado = '${end.estado}', cep = '${end.cep}'
    WHERE id_cliente_endereco = '${ids.rows[0].cliente_endereco_id}' `);
    
    return {"result":true};

  }
  catch(error){
    console.log("Database Error: ", error);
    return {"error":error};
  }
  
}

const deleteClient = async (clientId) => {

  try{

    const ids = await connect.query(`select cliente_info_id, cliente_endereco_id from cliente where id_cliente = '${clientId}' `);
  
    const result = await connect.query(`DELETE FROM cliente where id_cliente = '${clientId}' `);

    if(result.rowCount <= 0){
      return {"error":"Not found"};
    }

    await connect.query(`DELETE FROM cliente_info WHERE id_cliente_info = '${ids.rows[0].cliente_info_id}' `);
  
    await connect.query(`DELETE FROM cliente_endereco WHERE id_cliente_endereco = '${ids.rows[0].cliente_endereco_id}' `);
    
    return {"result":true};

  }
  catch(error){
    console.log("Database Error: ", error);
    return {"error":error};
  }

  
}

module.exports = {createClient,getClient,getClients,updateClient,deleteClient};