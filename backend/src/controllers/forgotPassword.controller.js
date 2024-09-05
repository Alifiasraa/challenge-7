const forgotPasswordService = require("../services/forgotPassword.service");

const forgotPassword = async (req, res) => {
  try {
    const result = await forgotPasswordService(req.body);
    if (result.status === "Not Found") {
      return res.status(404).json({
        status: result.status,
        message: result.message,
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Reset password email sent",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = forgotPassword;
