const prisma = require("../config/prisma");
const bcrypt = require("bcrypt");

const resetPassword = async (id, password) => {
  return await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      password: bcrypt.hashSync(password, 10),
    },
  });
};

module.exports = resetPassword;
