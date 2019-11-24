const { createUsers, getUsers, getUser, updateUser, deleteUser, loginUser } = require('./userDAL');
let id_test = "";
test('Should create a user', async ()=> {
    //Test user
    const user = {
        name:"root",
        password:"root12345",
        email:"laurencio.arkauss@gmail.com",
        level:"1"
    };


    const resp = await createUsers(user);
    expect(resp).toStrictEqual({result: true});
});


test('Should not create a user, same email', async ()=> {
  //Test user
  const user = {
      name:"root",
      password:"root12345",
      email:"laurencio.arkauss@gmail.com",
      level:"1"
  };

  const resp = await createUsers(user);
  expect(resp).not.toStrictEqual({result: true});
});


test('Should get all users', async () =>{
    //Getting the id for test 
    const resp = await getUsers();
    let obj_test = resp.result[resp.result.length-1];
    id_test = obj_test.id_usuario;

    //Expected user
    const result = {
      id_usuario: id_test,
      nome: "root",
      email: "laurencio.arkauss@gmail.com",
      nivel: 1
    };

    expect(obj_test).toStrictEqual(result);
});



test('Should get a user', async () =>{
    //Expected user
    const result = {
      result: [
        {
          id_usuario: id_test,
          nome: "root",
          email: "laurencio.arkauss@gmail.com",
          nivel: 1
        }
      ]
    };


    const resp = await getUser(id_test);
    expect(resp).toStrictEqual(result);
});


test('Should update a user', async () =>{
  //Test user data
  const user = {
    name: "root42",
    password: "",
    email: "laurencio.atestekaust2s3@gmail.com",
    level: "1",
    id: id_test
  };

  const resp = await updateUser(user);
  expect(resp).toStrictEqual({result: true});
});

test('Should a user logon', async () =>{
  //Test user login data
  const user = {
    password:"root12345",
    email:"laurencio.atestekaust2s3@gmail.com",
};
  //Expected user
  const result = {
    result: [
      {
        email: "laurencio.atestekaust2s3@gmail.com",
        id_usuario: id_test,
        nivel: 1,
        nome: "root42",
        senha: "root12345",
      }
    ]
  };
  const resp = await loginUser(user);
  expect({result: resp.rows}).toStrictEqual(result);
});


test('Should delete a user', async () =>{
  const resp = await deleteUser(id_test);
  expect(resp).toStrictEqual({result: true});
});