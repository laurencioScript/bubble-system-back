const bcrypt = require("bcryptjs");

const userDal = require("./user.dal");
const JWT = require("./../../jwt");

const login = async (user) => {
  
  const dataUser = await userDal.loginUser(user);

  console.log('>>> dataUser',dataUser);

  if(!await bcrypt.compare(user.password, dataUser[0].password_user)){
    throw {
      detail:'Password Invalid or User not exists',
      status:400
    }
  }

  delete user.password;
  user.token = JWT.generateToken({
    id:dataUser.id_user,
    level:dataUser.level_user
  });

  return user;
    
}



module.exports = {login};