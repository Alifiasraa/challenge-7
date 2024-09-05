const jwt = require("jsonwebtoken");
const resetPasswordService = require("../services/resetPassword.service");

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded.id;

    await resetPasswordService(id, req.body.password);

    return res.status(200).json({
      status: "success",
      message: "Password has been successfully reset",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = resetPassword;
