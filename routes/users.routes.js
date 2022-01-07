const { Router } = require("express");
const { check } = require("express-validator");
const {
	validateInputs,
	validateJWT,
	// isAdminRole,
	hasRole,
} = require("../middlewares");
const {
	isRoleValidate,
	existEmail,
	existUserById,
} = require("../helpers");
const {
	usersGet,
	userPost,
	userPut,
	userDelete,
} = require("../controllers/users.controllers");

const router = Router();

router.get("/", usersGet);

router.post(
	"/",
	[
		check("name", "name is required").not().isEmpty(),
		check("password", "password should has 6 letters").isLength({ min: 6 }),
		check("email", "Email already exist").isEmail(),
		check("email").custom(existEmail),
		// check("role", "role is not validate").isIn(["ADMIN_ROLE", "USER_ROLE"]),
		check("role").custom(isRoleValidate), // se le otorga como argumento lo que devuelve check role. isRoleValidate === (role) => isRoleValidate(role)
		validateInputs,
	],
	userPost
);

router.put(
	"/:id",
	[
		validateJWT,
		check("id", "id is not mongo ID").isMongoId(),
		check("id").custom(existUserById),
		check("role").custom(isRoleValidate),
		validateInputs,
	],
	userPut
);

router.delete(
	"/:id",
	[
		validateJWT,
		// isAdminRole,
		hasRole("ADMIN_ROLE", "SELL_ROLE"),
		check("id", "id is not mongo ID").isMongoId(),
		check("id").custom(existUserById),
		validateInputs,
	],
	userDelete
);

module.exports = router;
