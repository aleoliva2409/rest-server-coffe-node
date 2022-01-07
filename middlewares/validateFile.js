const validateFiles = (req, res, next) => {
	if (!req.files || Object.keys(req.files).length === 0)
		return res.status(400).json({ msg: "files don't exist" });

	if (!req.files.file)
		return res.status(400).json({ msg: "files don't exist" });

	next();
};

module.exports = {
	validateFiles
}
