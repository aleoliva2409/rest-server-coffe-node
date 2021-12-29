const { ObjectId } = require('mongoose').Types
const { User, Category, Product} = require('../models')

const allowedCollections = [
	'users',
	'categories',
	'products',
	'roles'
]

const searchUsers = async(term = '', res) => {

	const isMongoId = ObjectId.isValid(term)

	if(isMongoId) {
		const user = await User.findById(term)

		return res.json({
			results: user ? [user] : []
		})
	}


	const regex = new RegExp(term, 'i')

	const user = await User.find({
		$or: [{name: regex}, {email: regex}],
		$and: [{status: true}]
	})

	res.json({
		results: user
	})

}


const search = (req, res) => {
	try {
		const { colection, term } = req.params

		if(!allowedCollections.includes(colection)) return res.status(400).json({msg: `Allowed collections are: ${allowedCollections}`})

		switch (colection) {
			case 'users':
					searchUsers(term, res)
				break;

			case 'categories':
				break;

			case 'products':
				break;

			case 'roles':
				break;

			default:
				res.status(500).json({
					msg: 'Internal server error'
				})
				break;
		}

		res.send("vamos los pibes")
	} catch (error) {
		console.log(error)
	}

}

module.exports = {
	search
}
