const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config.db");

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;
		this.usersRoutePath = "/api/users";
		this.authPath = "/api/auth"

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
		this.app.use(this.usersRoutePath, require("../routes/users.routes"));
		this.app.use(this.authPath, require("../routes/auth.routes"))
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log("listening on port", this.port);
		});
	}
}

module.exports = Server;
