import { access, constants, cp } from "node:fs";
const copy = async () => {
	const sourcePath = `${import.meta.dirname}/files`;
	const destPath = `${import.meta.dirname}/files_copy`;
	access(destPath, constants.F_OK, (err) => {
		if (!err) throw new Error("FS operation failed");
		cp(sourcePath, destPath, { recursive: true }, () => {})
	})
};

await copy();
