const { connect } = require("./../../../database");
const uuidV4 = require("uuid/v4");

const createDefect = async (defect) => {
  const client = connect();
  try {
    return await client.query(`insert into defect  values 
         ('${defect.id}','${defect.name}') `);
  } catch (error) {
    throw error;
  } finally {
    client.end();
  }
};

const getDefects = async (values) => {
  const client = connect();
  try {
    let query = "select * from defect ";
    if (values.name) {
      query += "where ";
      query += values.name ? `defect_name like '%${values.name}%' ` : "";
    }

    query += `order by defect_name desc limit '${values.limit}' offset '${values.offset}'`;

    return await client.query(query);
  } catch (error) {
    throw error;
  } finally {
    client.end();
  }
};

const getDefect = async (defectId) => {
  const client = connect();
  try {
    return await client.query(
      `select * from defect where id_defect = '${defectId}'`
    );
  } catch (error) {
    throw error;
  } finally {
    client.end();
  }
};

const updateDefect = async (defect) => {
  const defectExist = await getDefect(defect.id);
  const client = connect();
  try {
    return await client.query(`UPDATE defect 
    SET defect_name = '${defect.name ? defect.name : defectExist.name}'
    where id_defect = '${defect.id}' `);
  } catch (error) {
    throw error;
  } finally {
    client.end();
  }
};

const deleteDefect = async (defectId) => {
  const client = connect();
  try {
    return await client.query(
      `DELETE FROM defect WHERE id_defect = '${defectId}' `
    );
  } catch (error) {
    throw error;
  } finally {
    client.end();
  }
};

module.exports = {
  createDefect,
  getDefect,
  getDefects,
  updateDefect,
  deleteDefect,
};
