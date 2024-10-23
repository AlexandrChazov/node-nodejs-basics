import { readFile } from "node:fs";
const read = async () => {
	 readFile(`${import.meta.dirname}/files/fileToRead.txt`, "utf-8", (err, data) => {
		 if (err) {
			 throw new Error("FS operation failed")
		 } else {
			 console.log(data);
		 }
	 })
};

await read();