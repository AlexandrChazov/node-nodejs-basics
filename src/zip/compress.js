import { createReadStream, createWriteStream, rm } from "fs";
import { createGzip } from "zlib";

const compress = async () => {
    const sourcePath = `${import.meta.dirname}/files/fileToCompress.txt`;
    const distPath = `${import.meta.dirname}/files/archive.gz`;
		const gzip = createGzip();
		const readStream = createReadStream(sourcePath);
		const writeStream = createWriteStream(distPath);

		readStream
			.on("error", handleError(readStream, writeStream))
			.pipe(gzip)
			.pipe(writeStream)
			.on("finish", deleteFile(sourcePath))
			.on("error", handleError(readStream, writeStream));
};

await compress();

function handleError(readStream, writeStream) {
	return function () {
		console.error("Finished with error...");
		readStream.destroy();
		writeStream.end("Finished with error...");
	}
}

function deleteFile(path) {
	return function () {
		rm(path, (err) => {
			if (err) console.error("Failed to delete source file");
		})
	}
}