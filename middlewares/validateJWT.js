const { User } = require("../models");
const jwt = require("jsonwebtoken");

const validateJWT = async (req, res, next) => {
	try {
		const token = req.header("x-token");
		
		if (!token) {
			return res.status(401).json({
				msg: "token is not exist",
			});
		}

		const { uid } = jwt.verify(token, process.env.SECRET_PRIVATE_KEY);
		// req.uid = uid
		const user = await User.findById(uid);
		// Verify if user exist
		if (!user) {
			return res.status(401).json({
				msg: "Token is not validate - User is not exist",
			});
		}

		// Verify user status
		if (!user.status) {
			return res.status(401).json({
				msg: "Token is not validate - User status: false",
			});
		}

		req.user = user;
		next();
	} catch (error) {
		console.log(error);
		res.status(401).json({
			msg: "token is not validate",
		});
	}
};

module.exports = {
	validateJWT,
};
