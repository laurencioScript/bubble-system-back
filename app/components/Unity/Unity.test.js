const { createUnity, getUnitys, getUnity, updateUnity, deleteUnity } = require('./unityDAL');
let id_test = "";

test('Should create a unity', async ()=> {
    //Test unity
    const unity = {
      unidade:"litros"
    };

    const resp = await createUnity(unity);
    expect(resp).toStrictEqual({result: true});
});


test('Should get all unities', async () => {
  //Getting the id for test 
  const resp = await getUnitys();
  let obj_test = resp.result[resp.result.length-1];
  id_test = obj_test.id_unidade;

  //Expected unity
  const result = {
    id_unidade: id_test,
    unidade: "litros"
  };
  
  expect(obj_test).toStrictEqual(result);
});



test('Should get a unity', async () =>{
    //Expected unity
    const result = {
      result: [
        {
          id_unidade: id_test,
          unidade: "litros"
        }
      ]
    }


    const resp = await getUnity(id_test);
    expect(resp).toStrictEqual(result);
});


test('Should update a unity', async () =>{
  //Test unity data
  const unity = {
      unidade:"metros",
      id: id_test
    };

  const resp = await updateUnity(unity);
  expect(resp).toStrictEqual({result: true});
});


test('Should delete a unity', async () =>{
  const resp = await deleteUnity(id_test);
  expect(resp).toStrictEqual({result: true});
});