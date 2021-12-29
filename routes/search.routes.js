const { Router } = require("express");
const { check } = require("express-validator");
const { search } = require("../controllers/search.controller");
const { validateInputs } = require("../middlewares/validateInputs");

const router = Router();

router.get("/:colection/:term", search)

module.exports = router
