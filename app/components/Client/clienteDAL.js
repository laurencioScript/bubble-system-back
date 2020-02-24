const {connect} = require('./../../../database');


const createClient =  async (client) => {
  const newConnect = connect();
  try{
      
        await newConnect.query(`insert into client_info 
        (id_client_info,cpf_cnpj,type_client,name_client,corporate_name,email,observation_description,observation_color,contact)
        values ($1,$2,$3,$4,$5,$6,$7,$8, $9)`,
        [client.idInfo, client.cpf_cnpj, client.type_client, client.name_client, client.corporate_name, client.email, client.observation_description, client.observation_color, client.contact]);
            
        await newConnect.query(`insert into client_address (id_client_address, address_client,number,complement,neighborhood,city,state_city,cep)
        values ('${client.idEnd}','${client.address_client}','${client.number}','${client.complement}','${client.neighborhood}','${client.city}','${client.state_city}','${client.cep}')`);

        return await newConnect.query(`insert into client (id_client, client_info_id,client_address_id) values
        ('${client.id}','${client.idInfo}','${client.idEnd}')`);
  

  }
  catch (error) {
    
    throw error;
  }
  finally {

    newConnect.end();
  }

}


const getClients = async () => {
  const client = connect();
  try{

    const result = await client.query(`
            select  id_client,info.id_client_info,ende.id_client_address,
                    info.cpf_cnpj,info.type_client,info.name_client,info.corporate_name,info.email,info.observation_description,info.observation_color,info.contact,
                    ende.address_client,ende.number,ende.complement,ende.neighborhood,ende.city,ende.state_city ,ende.cep
                    from client 
                    join client_info info on info.id_client_info = client_info_id 
                    join client_address ende on ende.id_client_address = client_address_id ;`);

    return result;

  }
  catch (error) {
    
    throw error;
  }
  finally {

    client.end();
  }
}

const getClient = async (clientId) => {
  const client = connect();
  try{

    return await client.query(`select id_client,info.id_client_info,ende.id_client_address,
    info.cpf_cnpj,info.type_client,info.name_client,info.corporate_name,info.email,info.observation_description,info.observation_color,info.contact,
    ende.address_client,ende.number,ende.complement,ende.neighborhood,ende.city,ende.state_city ,ende.cep
    from client 
    join client_info info on info.id_client_info = client_info_id 
    join client_address ende on ende.id_client_address = client_address_id  
    where id_client = '${clientId}';`);

  }
  catch (error) {
    
    throw error;
  }
  finally {

    client.end();
  }
}


const updateClient = async (clientE) => {
  const client = connect();
  try{
    
    const{info, end} = clientE;
    
    let clientExist = await getClient(clientE.id);
    clientExist = clientExist.rows[0];
    
    let cpf = info.cpf_cnpj != clientExist.cpf_cnpj ? `cpf_cnpj = '${info.cpf_cnpj}', ` :``;
  

    await client.query(`UPDATE client_info SET ${cpf}
    type_client = '${info.type_client || clientExist.type_client }',name_client ='${info.name_client || clientExist.name_client }', 
    corporate_name = '${info.corporate_name || clientExist.corporate_name }', 
    email = '${info.email || clientExist.email }', observation_description = '${info.observacao_desc || clientExist.observacao_desc }',
    observation_color = '${info.observation_color || clientExist.observation_color }', contact = ARRAY ['${info.contact || clientExist.contact }']
    WHERE id_client_info = '${clientExist.id_client_info}' `);
  
    return await client.query(`UPDATE client_address SET 
    address_client = '${end.address_client || clientExist.address_client }', number = '${end.number || clientExist.number }', complement = '${end.complement || clientExist.complement }', 
    neighborhood = '${end.neighborhood || clientExist.neighborhood }', city = '${end.city || clientExist.city }', state_city = '${end.state_city || clientExist.state_city }', cep = '${end.cep || clientExist.cep }'
    WHERE id_client_address = '${clientExist.id_client_address}' `);
    
    

  }
  catch (error) {
    
    throw error;
  }
  finally {

    client.end();
  }
}

const deleteClient = async (clientId) => {
  const client = connect();
  try{
    
    let clientE = await getClients(clientId);
    clientE = clientE.rows[0];
    
    const result = await client.query(`DELETE FROM client where id_client = '${clientId}' `);

    await client.query(`DELETE FROM client_info WHERE id_client_info = '${clientE.id_client_info}' `);
  
    await client.query(`DELETE FROM client_address WHERE id_client_address = '${clientE.id_client_address}' `);
    
    return result;

  }
  catch (error) {
    
    throw error;
  }
  finally {

    client.end();
  }
  
}

module.exports = {createClient,getClient,getClients,updateClient,deleteClient};