const { User, Role, Category, Product } = require("../models/");

const isRoleValidate = async (role = "") => {
	const existRole = await Role.findOne({ role });
	if (!existRole) {
		throw new Error(`Role ${role} is not exist`);
	}
};

const existEmail = async (email = "") => {
	const emailExist = await User.findOne({ email });
	if (emailExist) {
		throw new Error(`Email ${email} already exist`);
	}
};

const existUserById = async (id) => {
	const user = await User.findById(id);
	if (!user) {
		throw new Error(`user ${id} is not exist`);
	}
};

const existCategoryById = async (id) => {
	const category = await Category.findById(id);
	if (!category) {
		throw new Error(`category ${id} is not exist`);
	}
};

const existProductById = async (id) => {
	const product = await Product.findById(id);
	if (!product) {
		throw new Error(`product ${id} is not exist`);
	}
};

const colectionsAllowed = (colection = '', colectionsAllowed = []) => {
	const existColection = colectionsAllowed.includes(colection)
	if(!existColection) throw new Error(`colection ${colection} is not allowed`)

	// ? aca se retorna TRUE porque supuestamente se llama de una forma diferente a la funcion y ademas recibe como argumentos otros datos
	return true
}

module.exports = {
	isRoleValidate,
	existEmail,
	existUserById,
	existCategoryById,
	existProductById,
	colectionsAllowed
};
