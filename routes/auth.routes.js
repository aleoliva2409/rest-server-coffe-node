const { Router } = require("express");
const { check } = require("express-validator")
const { login, googleSignIn } = require("../controllers/auth.controller");
const { validateInputs } = require("../middlewares/validateInputs");

const router = Router();

router.post("/login", [
	check("email", "Email is required").isEmail(),
	check("password", "Password is required").not().isEmpty(),
	validateInputs
], login)

router.post("/google", [
	check("id_token", "id_token is required").not().isEmpty(),
	validateInputs
], googleSignIn)

module.exports = router
