const registerService = require("../services/register.service");

const register = async (req, res) => {
  try {
    const result = await registerService(req.body);
    if (result.status === "Bad Request") {
      return res.status(400).json({
        status: "error",
        message: result.message,
      });
    }
    res.status(201).json({
      status: "success",
      message: "Register successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = register;
