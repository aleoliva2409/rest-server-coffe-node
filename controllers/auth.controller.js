const { User } = require("../models");
const bcryptjs = require("bcryptjs");
const { generateJWT, googleVerify } = require("../helpers");

const login = async (req, res) => {
	const { email, password } = req.body;

	try {
		// Verify email
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({
				msg: "User/Password was wrong - email",
			});
		}

		// user status
		if (!user.status) {
			return res.status(400).json({
				msg: "User/Password was wrong - status: false",
			});
		}

		// Verify password
		const validatePassword = bcryptjs.compareSync(password, user.password);
		if (!validatePassword) {
			return res.status(400).json({
				msg: "User/Password was wrong - password",
			});
		}
		// Generar el JWT
		const token = await generateJWT(user.id);

		res.json({
			user,
			token,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			msg: "Server error",
		});
	}
};

const googleSignIn = async (req, res) => {
	try {
		const { id_token } = req.body;
		const { name, img, email } = await googleVerify(id_token);

		let user = await User.findOne({ email });
		if (!user) {
			const data = {
				name,
				img,
				email,
				password: "googlePassword",
				google: true,
			};

			user = new User(data);
			await user.save();
		}

		if (!user.status) {
			return res.status(401).json({
				msg: "user blocked",
			});
		}

		const token = await generateJWT(user.id);

		res.json({
			user,
			token,
		});
	} catch (error) {
		res.status(500).json({
			msg: "google´s token is not verify",
		});
	}
};

module.exports = {
	login,
	googleSignIn,
};
