const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config.db");

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;
		this.routesPath = {
			auth: "/api/auth",
			categories: "/api/categories",
			products: "/api/products",
			users: "/api/users"
		}

		//* Conexion con la DB
		this.connectDB();
		//* Midlewares
		this.middlewares();
		//* Rutas de la App
		this.routes();
	}

	async connectDB() {
		await dbConnection();
	}

	middlewares() {
		this.app.use(cors());
		//* lectura y parseo del body
		this.app.use(express.json());
		this.app.use(express.static("public"));
	}

	routes() {
		this.app.use(this.routesPath.auth, require("../routes/auth.routes"));
		this.app.use(this.routesPath.categories, require("../routes/categories.routes"));
		this.app.use(this.routesPath.products, require("../routes/products.routes"))
		this.app.use(this.routesPath.users, require("../routes/users.routes"));
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log("listening on port", this.port);
		});
	}
}

module.exports = Server;
