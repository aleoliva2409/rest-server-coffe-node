const path = require("path");
const { v4: uuidv4 } = require("uuid");

const uploadFiles = (
	files,
	extensionsAllowed = ["png", "jpg", "jpeg", "gif"],
	folder = ""
) => {
	return new Promise((resolve, reject) => {
		const { file } = files;

		const cutName = file.name.split(".");
		const extension = cutName[cutName.length - 1];

		// ? Validate extension

		if (!extensionsAllowed.includes(extension))
			return reject(`${extension} extension is not allowed`);

		const newName = uuidv4() + "." + extension;
		const uploadPath = path.join(__dirname, "../uploads/", folder, newName);

		file.mv(uploadPath, (err) => {
			if (err) return reject(err);

			resolve(newName);
		});
	});
};

module.exports = {
	uploadFiles
}
