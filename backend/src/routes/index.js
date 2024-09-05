const { Router } = require("express");
const registerController = require("../controllers/register.controller");
const loginController = require("../controllers/login.controller");
const forgotPasswordController = require("../controllers/forgotPassword.controller");
const resetPasswordController = require("../controllers/resetPassword.controller");

const router = Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/forgot-password", forgotPasswordController);
router.put("/reset-password/:token", resetPasswordController);

module.exports = router;
