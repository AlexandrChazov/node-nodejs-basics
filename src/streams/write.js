import { createWriteStream } from "node:fs";
const write = async () => {
	const filePath = `${import.meta.dirname}/files/fileToWrite.txt`;

	const writeStream = createWriteStream(filePath);
  process.stdin.on("data", (input) => {
		writeStream.write(input);
	})
	process.stdin.on("end", () => {
		writeStream.end();
	})

	process.stdin.on("error", () => {
		console.log("Something went wrong")
	})
	writeStream.on("error", () => {
		console.log("Something went wrong")
	})
};

await write();