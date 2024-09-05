const registerService = require("../services/register.service");

const register = async (req, res) => {
  try {
    const registeredUser = await registerService(req.body);
    if (registeredUser.status === "Bad Request") {
      return res.status(400).json({
        status: "error",
        message: registeredUser.message,
      });
    }
    res.status(201).json({
      status: "success",
      message: "Register successfully",
      data: registeredUser,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = register;
