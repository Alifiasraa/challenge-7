const transporter = require("../config/nodemailer");
const prisma = require("../config/prisma");
const jwt = require("jsonwebtoken");

const forgotPassword = async (body) => {
  const user = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (!user) return { status: "Not Found", message: "Email is not registered" };

  const payload_token = {
    id: user.id,
    email: user.email,
  };

  const token = jwt.sign(payload_token, process.env.JWT_SECRET, {
    expiresIn: "30m",
  });

  return await transporter.sendMail({
    from: "Admin",
    to: body.email,
    subject: "Reset Password",
    text: `http://localhost:3000/api/v1/reset-password/${token}`,
  });
};

module.exports = forgotPassword;
