const { Router } = require("express");
const { check } = require("express-validator");
const { loadFile, updateImageCloudinary, showImage } = require("../controllers/uploads.controller");
const { validateInputs, validateFiles } = require("../middlewares");
const { colectionsAllowed } = require('../helpers')

const router = Router();

router.post('/', validateFiles, loadFile)

router.put('/:colection/:id', [
	validateFiles,
	check('id', 'Should be a mongo ID').isMongoId(),
	check('colection').custom(colection => colectionsAllowed(colection, ['users', 'products'])),
	validateInputs,
], updateImageCloudinary)

router.get('/:colection/:id', [
	check('id', 'Should be a mongo ID').isMongoId(),
	check('colection').custom(colection => colectionsAllowed(colection, ['users', 'products'])),
	validateInputs,
], showImage)

module.exports = router
