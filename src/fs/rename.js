import fs, { access, constants } from "node:fs";
const rename = async () => {
	const wrongFilePath = `${import.meta.dirname}/files/wrongFilename.txt`;
	const properFilePath = `${import.meta.dirname}/files/properFilename.md`;
	access(properFilePath, constants.F_OK, (err) => {
		if (!err) throw new Error("FS operation failed");
		access(wrongFilePath, constants.F_OK, (err) => {
			if (err) throw new Error("FS operation failed");
			fs.rename(wrongFilePath, properFilePath, (err) => {
				if (err) throw new Error("FS operation failed");
			})
		})
	})
};

await rename();