const { createDefect, getDefects, getDefect, updateDefect, deleteDefect} = require('./defectDAL');
let id_test = "";
test('Should create a Defect', async ()=> {
    //Test Defect
    const Defect = {
        defect:"mancha"
    };


    const resp = await createDefect(Defect);
    expect(resp).toStrictEqual({result: true});
});


test('Should get all Defects', async () =>{
    //Getting the id for test 
    const resp = await getDefects();
    let obj_test = resp.result[resp.result.length-1];
    id_test = obj_test.id_defeito;

    //Expected Defect
    const result = {
      id_defeito: id_test,
      defeito: "mancha"
    }; 

    expect(obj_test).toStrictEqual(result);
});



test('Should get a Defect', async () =>{
    //Expected Defect
    const result = {
      result: [
        {
          id_defeito: id_test,
          defeito: "mancha"
        }
      ]
    };


    const resp = await getDefect(id_test);
    expect(resp).toStrictEqual(result);
});


test('Should update a Defect', async () =>{
  //Test Defect data
  const Defect = {
    defeito:"rasgo",
    id: id_test
};

  const resp = await updateDefect(Defect);
  expect(resp).toStrictEqual({result: true});
});


test('Should delete a Defect', async () =>{
  const resp = await deleteDefect(id_test);
  expect(resp).toStrictEqual({result: true});
});