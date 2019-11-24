const { createCharacteristic, getCharacteristics, getCharacteristic, updateCharacteristic, deleteCharacteristic} = require('./characteristicDAL');
let id_test = "";
test('Should create a Characteristic', async ()=> {
    //Test Characteristic
    const Characteristic = {
        caracteristica:"bordado"
    };


    const resp = await createCharacteristic(Characteristic);
    expect(resp).toStrictEqual({result: true});
});


test('Should get all Characteristics', async () =>{
    //Getting the id for test 
    const resp = await getCharacteristics();
    let obj_test = resp.result[resp.result.length-1];
    id_test = obj_test.id_caracteristica;

    //Expected Characteristic
    const result = {
      id_caracteristica: id_test,
      caracteristica: "bordado"
    }; 

    expect(obj_test).toStrictEqual(result);
});



test('Should get a Characteristic', async () =>{
    //Expected Characteristic
    const result = {
      result: [
        {
          id_caracteristica: id_test,
          caracteristica: "bordado"
        }
      ]
    };


    const resp = await getCharacteristic(id_test);
    expect(resp).toStrictEqual(result);
});


test('Should update a Characteristic', async () =>{
  //Test Characteristic data
  const Characteristic = {
    caracteristica:"estapando",
    id: id_test
};;

  const resp = await updateCharacteristic(Characteristic);
  expect(resp).toStrictEqual({result: true});
});


test('Should delete a Characteristic', async () =>{
  const resp = await deleteCharacteristic(id_test);
  expect(resp).toStrictEqual({result: true});
});