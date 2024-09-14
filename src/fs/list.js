import {access, constants, readdir} from "fs";
const list = async () => {
    const dirPath = `${import.meta.dirname}/files`;
		access(dirPath, constants.F_OK, (err) => {
			if (err) throw new Error("FS operation failed");
			readdir(dirPath, (err, files) => {
				err ?	console.log(err) : console.log(files)
			})
		})
};

await list();