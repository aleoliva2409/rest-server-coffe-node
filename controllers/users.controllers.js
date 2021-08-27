//* podemos NO usar esta importacion
const { response } = require("express");

const { User } = require("../models/");
const bcrypt = require("bcryptjs");

const usersGet = async (req, res = response) => {
	// const params = req.query
	// const { name = "no name", apikey, age } = req.query;

	const { limit = 5, skip = 0 } = req.query;

	const [total, users] = await Promise.all([
		User.countDocuments({ status: true }),
		User.find({ status: true }).skip(Number(skip)).limit(Number(limit)),
	]);

	res.json({
		msg: "get API - Controller",
		total,
		users,
	});
};

//* aca no usamos el response importado

const usersPost = async (req, res) => {
	//! NO RECOMENDADO
	// const body = req.body
	//* RECOMENDADO
	//* con destructuring
	// const {name,age} = req.body

	const { name, email, password, role } = req.body;
	const user = new User({ name, email, password, role });

	//? Encriptar la constraseña
	const salt = bcrypt.genSaltSync(); // por defecto es 10
	user.password = bcrypt.hashSync(password, salt);

	//? Guardar en DB
	await user.save();

	res.json({
		msg: "post API - Controller",
		user,
	});
};

const usersPut = async (req, res) => {
	const { id } = req.params;
	const { password, google, email, _id, ...rest } = req.body;

	if (password) {
		const salt = bcrypt.genSaltSync(); // por defecto es 10
		rest.password = bcrypt.hashSync(password, salt);
	}

	const userDB = await User.findByIdAndUpdate(id, rest);

	res.json({
		msg: "put API - Controller",
		userDB,
	});
};

const usersDelete = async (req, res) => {
	const { id } = req.params;

	// ? user auth
	// const uid = req.uid
	// const userAuth = req.user
	// const userAuth = await User.findById(uid)

	// borrar fisicamente
	// const user = await User.findByIdAndDelete(id)
	const userDelete = await User.findByIdAndUpdate(id, { status: false });

	// console.log(uid)
	res.json({
		msg: "delete API - Controller",
		userDelete,
		// userAuth
	});
};

module.exports = {
	usersGet,
	usersPost,
	usersPut,
	usersDelete,
};
