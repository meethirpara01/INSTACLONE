const express = require("express");
const authController = require("../controllers/auth.controller");
const identifyUser = require("../middlewares/auth.middleware");

const authRoute = express.Router();

authRoute.post("/register", authController.registerController);

authRoute.post("/login", authController.loginController);

authRoute.get("/get-me", identifyUser, authController.getMeController);

authRoute.post("/logout", authController.logoutController);


module.exports = authRoute;