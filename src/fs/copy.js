import { access, constants, cp  } from "fs";
const copy = async () => {
		const sourcePath = `${import.meta.dirname}/files`;
		const destPath = `${import.meta.dirname}/files_copy`;
    await access(destPath, constants.O_DIRECTORY, (err) => {
			if (!err) throw new Error("FS operation failed");
		})
		await cp(sourcePath, destPath, { recursive: true }, () => {})
};

await copy();
