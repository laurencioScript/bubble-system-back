const unityDal = require('./unity.dal');
const uuidv4 = require("uuidv4");

const createUnity =  async (unity) => {
  unity.id = uuidv4.uuid();
  const newUnity = await unityDal.createUnity(unity);
  return newUnity;
}

const getUnitys = async (query) => {
  const unitys = await unityDal.getUnitys(query);
  return unitys;
}

const getUnity = async (unityId) => {
  const unity = await unityDal.getUnity(unityId);
  return unity;
}


const updateUnity = async (unity) => {
  const updatedUnity = await unityDal.updateUnity(unity);
  return updatedUnity;
}


const deleteUnity = async (unityId) => {
  const deletedUnity = await unityDal.deleteUnity(unityId);
  return deletedUnity;
}

module.exports = {createUnity,getUnity,getUnitys,updateUnity,deleteUnity};