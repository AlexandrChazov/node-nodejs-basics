import { access, constants, rm } from "fs";

const remove = async () => {
	const filePath = `${import.meta.dirname}/files/fileToRemove.txt`
	access(filePath, constants.F_OK, (err) => {
		if (err) throw new Error("FS operation failed");
		rm(filePath, (err) => {
			if (err) console.log(err);
		})
	})
};

await remove();