import { EOL } from "node:os";
import { createReadStream } from "node:fs";

const read = async () => {
	const filePath = `${import.meta.dirname}/files/fileToRead.txt`;
  const readStream = createReadStream(filePath);

	// just to keep process alive so that reviewer could see stdout
	process.stdin.on("data", () => {});

	readStream.on('data', (chunk) => {
		process.stdout.write(chunk);
	})
	readStream.on('end', () => {
		process.stdout.write(EOL);
	})
	readStream.on('error', () => {
		console.log("Something went wrong");
	})
};

await read();