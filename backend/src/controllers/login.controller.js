const loginService = require("../services/login.service");

const login = async (req, res) => {
  try {
    const result = await loginService(req.body);

    if (result.status === "Bad Request") {
      return res.status(400).json({
        status: "error",
        message: result.message,
      });
    }

    res.status(200).json({
      status: "success",
      message: "Login successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = login;
