const { ObjectId } = require("mongoose").Types;
const { User, Category, Product } = require("../models");

const allowedCollections = ["users", "categories", "products", "roles"];

const searchUsers = async (term = "", res) => {
	try {
		const isMongoId = ObjectId.isValid(term);

		if (isMongoId) {
			const user = await User.findById(term);

			return res.json({
				results: user ? [user] : [],
			});
		}

		const regex = new RegExp(term, "i");

		const user = await User.find({
			$or: [{ name: regex }, { email: regex }],
			$and: [{ status: true }],
		});

		res.json({
			results: user,
		});
	} catch (error) {
		console.log(error);
	}
};

const searchCategories = async (term = "", res) => {
	try {
		const isMongoId = ObjectId.isValid(term);

		if (isMongoId) {
			const category = await Category.findById(term);

			return res.json({
				results: category ? [category] : [],
			});
		}

		const regex = new RegExp(term, "i");

		const categories = await Category.find({ name: regex, status: true });

		res.json({
			results: categories,
		});
	} catch (error) {
		console.log(error);
	}
};

const searchProducts = async (term = "", res) => {
	try {
		const isMongoId = ObjectId.isValid(term);

		if (isMongoId) {
			const product = await Product.findById(term).populate("category", "name");

			return res.json({
				results: product ? [product] : [],
			});
		}

		const regex = new RegExp(term, "i");

		const products = await Product.find({ name: regex, status: true }).populate(
			"category",
			"name"
		);

		res.json({
			results: products,
		});
	} catch (error) {
		console.log(error);
	}
};

const search = (req, res) => {
	try {
		const { colection, term } = req.params;

		if (!allowedCollections.includes(colection))
			return res
				.status(400)
				.json({ msg: `Allowed collections are: ${allowedCollections}` });

		switch (colection) {
			case "users":
				searchUsers(term, res);
				break;

			case "categories":
				searchCategories(term, res)
				break;

			case "products":
				searchProducts(term, res);
				break;

			case "roles":
				break;

			default:
				res.status(500).json({
					msg: "Internal server error",
				});
				break;
		}
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	search,
};
