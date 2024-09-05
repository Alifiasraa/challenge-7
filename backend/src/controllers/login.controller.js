const loginService = require("../services/login.service");

const login = async (req, res) => {
  try {
    const loggedInUser = await loginService(req.body);

    if (loggedInUser.status === "Bad Request") {
      return res.status(400).json({
        status: "error",
        message: loggedInUser.message,
      });
    }

    res.status(200).json({
      status: "success",
      message: "Login successfully",
      data: loggedInUser,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = login;
