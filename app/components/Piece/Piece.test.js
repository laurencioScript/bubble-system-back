const { createPiece, getPieces, getPiece, updatePiece, deletePiece} = require('./pieceDAL');
let id_test = "";
test('Should create a Piece', async ()=> {
    //Test Piece
    const Piece = {
        peca:"camisa",
        unidade:"metros",
        valor:2
    };


    const resp = await createPiece(Piece);
    expect(resp).toStrictEqual({result: true});
});


test('Should get all Pieces', async () =>{
    //Getting the id for test 
    const resp = await getPieces();
    let obj_test = resp.result[resp.result.length-1];
    id_test = obj_test.id_peca;

    //Expected Piece
    const result = {
      id_peca: id_test,
      peca: "camisa",
      unidade: "metros",
      valor: "2"
    };

    expect(obj_test).toStrictEqual(result);
});



test('Should get a Piece', async () =>{
    //Expected Piece
    const result = {
      result: [
        {
          id_peca: id_test,
          peca: "camisa",
          unidade: "metros",
          valor: "2"
        }
      ]
    };


    const resp = await getPiece(id_test);
    expect(resp).toStrictEqual(result);
});


test('Should update a Piece', async () =>{
  //Test Piece data
  const Piece = {
    peca:"tenis",
    unidade:"quantidade",
    valor:2,
    id: id_test
};
  const resp = await updatePiece(Piece);
  expect(resp).toStrictEqual({result: true});
});


test('Should delete a Piece', async () =>{
  const resp = await deletePiece(id_test);
  expect(resp).toStrictEqual({result: true});
});