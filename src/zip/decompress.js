import { createReadStream, createWriteStream, rm } from "fs";
import { createUnzip } from "zlib";
const decompress = async () => {
	const sourcePath = `${import.meta.dirname}/files/archive.gz`;
	const destPath = `${import.meta.dirname}/files/fileToCompress.txt`;
	const readStream = createReadStream(sourcePath);
	const writeStream = createWriteStream(destPath);
	const unzip = createUnzip();

	readStream
		.on("error", handleError(readStream, writeStream))
		.pipe(unzip)
		.pipe(writeStream)
		.on("finish", deleteFile(sourcePath))
		.on("error", handleError(readStream, writeStream));
};

await decompress();

function handleError(readStream, writeStream) {
	return function () {
		console.log("Decompressed with error");
		readStream.destroy();
		writeStream.end("Finished with error...")
	}
}

function deleteFile(path) {
	return function () {
		rm(path, (err) => {
			if (err) console.error("Failed to delete source file");
		})
	}
}