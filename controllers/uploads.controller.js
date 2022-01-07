const fs = require("fs");
const path = require("path");
const cloudinary = require("cloudinary").v2;

const { User, Product } = require("../models");
const { uploadFiles } = require("../helpers");

cloudinary.config(process.env.CLOUDINARY_URL);

const loadFile = async (req, res) => {
	try {
		// const pathFile = await uploadFiles(req.files, ['txt', 'md], texts);
		const name = await uploadFiles(req.files);

		res.json({ name });
	} catch (error) {
		res.status(400).json({ msg });
	}
};

const updateImage = async (req, res) => {
	try {
		const { id, colection } = req.params;

		let model;

		switch (colection) {
			case "users":
				model = await User.findById(id);
				if (!model)
					return res
						.status(400)
						.json({ msg: `User doesn't exist with id ${id}` });
				break;

			case "products":
				model = await Product.findById(id);
				if (!model)
					return res
						.status(400)
						.json({ msg: `Product doesn't exist with id ${id}` });
				break;

			default:
				return res.status(500).json({ msg: "Internal server error" });
		}

		if (model.img) {
			const pathImg = path.join(__dirname, "../uploads", colection, model.img);
			if (fs.existsSync(pathImg)) fs.unlinkSync(pathImg);
		}

		const nameFile = await uploadFiles(req.files, undefined, colection);
		model.img = nameFile;

		await model.save();

		res.json(model);
	} catch (error) {
		console.log(error);
	}
};

const updateImageCloudinary = async (req, res) => {
	try {
		const { id, colection } = req.params;

		let model;

		switch (colection) {
			case "users":
				model = await User.findById(id);
				if (!model)
					return res
						.status(400)
						.json({ msg: `User doesn't exist with id ${id}` });
				break;

			case "products":
				model = await Product.findById(id);
				if (!model)
					return res
						.status(400)
						.json({ msg: `Product doesn't exist with id ${id}` });
				break;

			default:
				return res.status(500).json({ msg: "Internal server error" });
		}

		// ? Limpiar imagenes previas
		if (model.img) {
			const nameArr = model.img.split('/')
			const name = nameArr[nameArr.length - 1]
			const [ imgId ] = name.split('.')
			await cloudinary.uploader.destroy(imgId)
		}

		const { tempFilePath } = req.files.file
		const { secure_url } = await cloudinary.uploader.upload(tempFilePath)

		model.img = secure_url;

		await model.save();

		res.json(model);
	} catch (error) {
		console.log(error);
	}
};

const showImage = async (req, res) => {
	try {
		const { id, colection } = req.params;

		let model;

		switch (colection) {
			case "users":
				model = await User.findById(id);
				if (!model)
					return res
						.status(400)
						.json({ msg: `User doesn't exist with id ${id}` });
				break;

			case "products":
				model = await Product.findById(id);
				if (!model)
					return res
						.status(400)
						.json({ msg: `Product doesn't exist with id ${id}` });
				break;

			default:
				return res.status(500).json({ msg: "Internal server error" });
		}

		if (model.img) {
			const pathImg = path.join(__dirname, "../uploads", colection, model.img);
			if (fs.existsSync(pathImg)) return res.sendFile(pathImg);
		}

		const pathImg = path.join(__dirname, "../assets/no-image.jpg");

		res.sendFile(pathImg);
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	loadFile,
	updateImage,
	showImage,
	updateImageCloudinary
};
