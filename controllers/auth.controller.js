const User = require("../models/User")
const bcryptjs = require("bcryptjs");
const { generateJWT } = require("../helpers/generateJWT");

const login = async(req,res) => {
	const { email, password } = req.body;

	try {

		// Verify email
		const user = await User.findOne({ email })
		if(!user) {
			return res.status(400).json({
				msg: "User/Password was wrong - email"
			})
		}

		// user status
		if(!user.status) {
			return res.status(400).json({
				msg: "User/Password was wrong - status: false"
			})
		}

		// Verify password
		const validatePassword = bcryptjs.compareSync(password, user.password)
		if(!validatePassword) {
			return res.status(400).json({
				msg: "User/Password was wrong - password"
			})
		}
		// Generar el JWT
		const token = await generateJWT( user.id );

		res.json({
			user,
			token
		})
	} catch (error) {
		console.log(error)
		return res.status(500).json({
			msg: "Server error"
		})
	}
}

module.exports = {
	login
}
