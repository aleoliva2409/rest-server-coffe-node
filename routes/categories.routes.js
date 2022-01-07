const { Router } = require("express");
const { check } = require("express-validator");
const {
	validateInputs,
	validateJWT,
	isAdminRole,
} = require("../middlewares");
const {
	existCategoryById,
} = require("../helpers");
const {
	getCategories,
	getCategory,
	updateCategory,
	deleteCategory,
	createCategory,
} = require("../controllers/categories.controllers");

const router = Router();

router.get("/", getCategories);

router.get("/:id", [
	check("id", "id is not mongo ID").isMongoId(),
	check("id").custom(existCategoryById)
], getCategory);

router.post("/", [
	validateJWT,
	check("name", "Name is required").not().isEmpty(),
	validateInputs
], createCategory);

router.put("/:id", [
	validateJWT,
	check("id", "id is not mongo ID").isMongoId(),
	check("id").custom(existCategoryById),
	validateInputs
], updateCategory);

router.delete("/:id",[
	validateJWT,
	isAdminRole,
	check("id", "id is not mongo ID").isMongoId(),
	check("id").custom(existCategoryById),
	validateInputs
], deleteCategory);

module.exports = router;
