const isAdminRole = (req, res, next) => {
	if(!req.user) {
		return res.status(500).json({
			msg: "Verify role without verify token"
		})
	}

	const { role, email } = req.user

	if(role !== "ADMIN_ROLE") {
		return res.status(401).json({
			msg: `${email} is not admin`
		})
	}

	next()
}

const hasRole = (...roles) => (req, res, next) => {
	if(!req.user) {
		return res.status(500).json({
			msg: "Verify role without verify token"
		})
	}

	if(!roles.includes(req.user.role)) {
		return res.status(401).json({
			msg: `Service require these roles: ${roles}`
		})
	}

	next()
}

module.exports = {
	isAdminRole,
	hasRole
}
