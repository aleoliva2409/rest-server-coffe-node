const validateJWT = require("../middlewares/validateJWT");
const validateInputs = require("../middlewares/validateInputs")
const validateRoles = require("../middlewares/validateRoles");

module.exports = {
	...validateInputs,
	...validateJWT,
	...validateRoles
}
