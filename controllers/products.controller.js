const { Product } = require("../models");

const getProducts = async (req, res) => {
	try {
		const { limit = 5, skip = 0 } = req.query;

		const [total, products] = await Promise.all([
			Product.countDocuments({ status: true }),
			Product.find({ status: true })
				.skip(Number(skip))
				.limit(Number(limit))
				.populate("user")
				.populate("category"),
		]);

		res.json({
			total,
			products,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: "Server internal error",
		});
	}
};

const getProduct = async (req, res) => {
	try {
		const { id } = req.params;

		const productDB = await Product.findById(id)
			.populate("user")
			.populate("category");

		res.status(200).json(productDB);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: "Server internal error",
		});
	}
};

const createProduct = async (req, res) => {
	try {
		const { status, user, ...body } = req.body;
		const productDB = await Product.findOne({ name: body.name.toUpperCase() });

		if (productDB) {
			return res.status(400).json({
				msg: "Product already exist",
			});
		}

		const product = new Product({
			...body,
			name: body.name.toUpperCase(),
			user: req.user._id,
		});

		await product.save();

		res.status(201).json(product);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: "Server internal error",
		});
	}
};

const updateProduct = async (req, res) => {
	try {
		const { id } = req.params;
		const { status, user, ...body } = req.body;

		if (body.name) {
			body.name = body.name.toUpperCase();
		}

		body.user = req.user._id;

		const productDB = await Product.findByIdAndUpdate(id, body, { new: true }); // ? el 3er Arg manda el el documento actualizado como respuesta

		res.status(200).json(productDB);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: "Server internal error",
		});
	}
};

const deleteProduct = async (req, res) => {
	try {
		const { id } = req.params;
		const productDB = await Product.findByIdAndUpdate(id, { status: false });

		res.status(200).json(productDB);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: "Server internal error",
		});
	}
};

module.exports = {
	getProducts,
	getProduct,
	createProduct,
	updateProduct,
	deleteProduct,
};
