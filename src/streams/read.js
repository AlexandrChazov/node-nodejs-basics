import { createReadStream } from "fs";

const read = async () => {
	const filePath = `${import.meta.dirname}/files/fileToRead.txt`;
  const readStream = createReadStream(filePath);

	readStream.on('data', (chunk) => {
		process.stdout.write(chunk);
	})
	readStream.on('error', () => {
		console.log("Something went wrong");
	})
};

await read();