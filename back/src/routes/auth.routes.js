const express = require("express");
const { body } = require("express-validator");
const authController = require("../controllers/auth.controller");
const validateRequest = require("../middleware/validateRequest");

const router = express.Router();

router.post(
	"/register",
	[
		body("email").isEmail().normalizeEmail(),
		body("password").isLength({ min: 6 }),
		body("name").trim().notEmpty(),
		validateRequest,
	],
	authController.register
);

router.post(
	"/login",
	[
		body("email").isEmail().normalizeEmail(),
		body("password").notEmpty(),
		validateRequest,
	],
	authController.login
);

router.post("/logout", authController.logout);

module.exports = router;
