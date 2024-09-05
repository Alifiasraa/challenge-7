const prisma = require("../config/prisma");
const bcrypt = require("bcrypt");

const register = async (body) => {
  const { name, email, password } = body;
  if (!name) {
    return { status: "Bad Request", message: "Name is required" };
  }

  if (!email) {
    return { status: "Bad Request", message: "Email is required" };
  }

  if (!password) {
    return { status: "Bad Request", message: "Password is required" };
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: email },
  });

  if (existingUser) {
    return { status: "Bad Request", message: "Email is already in use" };
  }

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: bcrypt.hashSync(body.password, 10),
    },
  });

  delete user.password;

  return user;
};

module.exports = register;
