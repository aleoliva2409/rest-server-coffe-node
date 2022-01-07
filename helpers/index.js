
const dbValidators = require('./dbValidators')
const generateJWT = require('./generateJWT')
const googleVerify = require('./googleVerify')
const uploadFiles = require('./uploadFiles')

module.exports = {
	...dbValidators,
	...generateJWT,
	...googleVerify,
	...uploadFiles
}
