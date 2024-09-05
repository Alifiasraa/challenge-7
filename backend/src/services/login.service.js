const prisma = require("../config/prisma");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = async (body) => {
  const { email, password } = body;

  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!user)
    return { status: "Bad Request", message: "Invalid email or password" };

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    return { status: "Bad Request", message: "Invalid email or password" };
  }

  delete user.password;

  const payload_token = {
    id: user.id,
    email: email,
  };

  const token = jwt.sign(payload_token, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return { token, user };
};

module.exports = login;
