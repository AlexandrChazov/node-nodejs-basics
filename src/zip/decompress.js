import { createReadStream, createWriteStream } from "fs";
import { createUnzip } from "zlib";
const decompress = async () => {
	const sourcePath = `${import.meta.dirname}/files/archive.gz`;
	const destPath = `${import.meta.dirname}/files/fileToCompress.txt`;
	const readStream = createReadStream(sourcePath);
	const writeStream = createWriteStream(destPath);
	const unzip = createUnzip();

	function handleError() {
		console.log("Decompressed with error");
		readStream.destroy();
		writeStream.end("Finished with error...")
	}

	readStream
		.on("error", handleError)
		.pipe(unzip)
		.pipe(writeStream)
		.on("error", handleError);
};

await decompress();