const { createColor, getColors, getColor, updateColor, deleteColor} = require('./colorDAL');
let id_test = "";
test('Should create a Color', async ()=> {
    //Test Color
    const Color = {
      color: "marron",
      hexadecimal: "#d16d00"
  };


    const resp = await createColor(Color);
    expect(resp).toStrictEqual({result: true});
});


test('Should get all Colors', async () =>{
    //Getting the id for test 
    const resp = await getColors();
    let obj_test = resp.result[resp.result.length-1];
    id_test = obj_test.id_cor;

    //Expected Color
    const result = {
      id_cor: id_test,
      cor_nome: "marron",
      hexadecimal: "#d16d00"
    }; 

    expect(obj_test).toStrictEqual(result);
});



test('Should get a Color', async () =>{
    //Expected Color
    const result = {
      result: [
        {
          id_cor: id_test,
          cor_nome: "marron",
          hexadecimal:"#d16d00"
        }
      ]
    };


    const resp = await getColor(id_test);
    expect(resp).toStrictEqual(result);
});


test('Should update a Color', async () =>{
  //Test Color data
  const Color = {
    color:"rosa",
    hexadecimal:"#ff00ff",
    id: id_test
};

  const resp = await updateColor(Color);
  expect(resp).toStrictEqual({result: true});
});


test('Should delete a Color', async () =>{
  const resp = await deleteColor(id_test);
  expect(resp).toStrictEqual({result: true});
});