const validateJWT = require("../middlewares/validateJWT");
const validateInputs = require("../middlewares/validateInputs")
const validateRoles = require("../middlewares/validateRoles");
const validateFiles = require('../middlewares/validateFile')

module.exports = {
	...validateInputs,
	...validateJWT,
	...validateRoles,
	...validateFiles
}
