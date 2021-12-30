const { Category } = require("../models");

// ! no verificar id si ya estan verificados por los middlewares en las rutas

const getCategories = async (req, res) => {
	try {
		const { limit = 5, skip = 0 } = req.query;

		const [total, categories] = await Promise.all([
			Category.countDocuments({ status: true }),
			Category.find({ status: true })
				.skip(Number(skip))
				.limit(Number(limit))
				.populate("user", ["name", "email"]), // ? puede recibir una array de strings o un string si solo es un propiedad
		]);

		res.json({
			total,
			categories,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: "Server internal error",
		});
	}
};

const getCategory = async (req, res) => {
	try {
		const { id } = req.params;

		const categoryDB = await Category.findOne({
			_id: id,
			status: true,
		}).populate("user", "name"); // ? aca usamos solo un string para limitar la data que devuelve("name")

		if (!categoryDB) {
			return res.status(400).json({
				msg: "Don´t exist category",
			});
		}

		res.status(200).json(categoryDB);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: "Server internal error",
		});
	}
};

const createCategory = async (req, res) => {
	try {
		const name = req.body.name.toUpperCase();
		const categoryDB = await Category.findOne({ name });

		if (categoryDB) {
			return res.status(400).json({
				msg: "Category already exist",
			});
		}

		const category = new Category({
			name,
			user: req.user._id,
		});

		await category.save();

		res.status(201).json(category);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: "Server internal error",
		});
	}
};

const updateCategory = async (req, res) => {
	try {
		const { id } = req.params;
		const name = req.body.name.toUpperCase();

		const categoryDB = await Category.findByIdAndUpdate(id, { name });

		// ! no hacer esto si ya se verifico antes este ID en los middlewares
		if (!categoryDB) {
			return res.status(400).json({
				msg: "Category don´t exist",
			});
		}

		res.status(200).json(categoryDB);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: "Server internal error",
		});
	}
};

const deleteCategory = async (req, res) => {
	try {
		const { id } = req.params;

		const categoryDB = await Category.findByIdAndUpdate(id, { status: false });

		res.status(200).json(categoryDB);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: "Server internal error",
		});
	}
};

module.exports = {
	getCategories,
	getCategory,
	createCategory,
	updateCategory,
	deleteCategory,
};
