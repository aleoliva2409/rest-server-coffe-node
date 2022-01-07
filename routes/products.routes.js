const { Router } = require("express");
const { check } = require("express-validator");
const { validateInputs, validateJWT, isAdminRole } = require("../middlewares");
const {
	existProductById,
	existCategoryById,
} = require("../helpers");
const {
	getProducts,
	getProduct,
	updateProduct,
	deleteProduct,
	createProduct,
} = require("../controllers/products.controller");

const router = Router();

router.get("/", getProducts);

router.get(
	"/:id",
	[
		check("id", "id is not mongo ID").isMongoId(),
		check("id").custom(existProductById),
	],
	getProduct
);

router.post(
	"/",
	[
		validateJWT,
		check("name", "Name is required").not().isEmpty(),
		check("category", "id is not mongo ID").isMongoId(),
		check("category").custom(existCategoryById),
		validateInputs,
	],
	createProduct
);

router.put(
	"/:id",
	[
		validateJWT,
		check("id", "id is not mongo ID").isMongoId(),
		check("id").custom(existProductById),
		validateInputs,
	],
	updateProduct
);

router.delete(
	"/:id",
	[
		validateJWT,
		isAdminRole,
		check("id", "id is not mongo ID").isMongoId(),
		check("id").custom(existProductById),
		validateInputs,
	],
	deleteProduct
);

module.exports = router;
