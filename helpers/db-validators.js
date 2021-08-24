const Role = require("../models/Role");
const User = require("../models/User");

const isRoleValidate = async(role = "") => {
	const existRole = await Role.findOne({ role });
	if(!existRole) {
		throw new Error(`Role ${role} is not exist`)
	}
}

const existEmail = async(email = "") => {
	const emailExist = await User.findOne({ email });
	if(emailExist) {
		throw new Error(`Email ${email} already exist`)
	}
}

const existUserById = async(id) => {
	const user = await User.findById(id);
	if(!user) {
		throw new Error(`user ${id} is not exist`)
	}
}

module.exports = {
	isRoleValidate,
	existEmail,
	existUserById
}
