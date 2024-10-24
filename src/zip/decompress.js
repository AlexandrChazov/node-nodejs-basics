import { createReadStream, createWriteStream, rm } from "node:fs";
import { join } from "node:path";
import { pipeline } from "node:stream/promises";
import { createUnzip } from "node:zlib";

const dirname = import.meta.dirname;

const decompress = async () => {
	const sourcePath = join(dirname, "files", "archive.gz");
	const destPath = join(dirname, "files", "fileToCompress.txt");
	const readStream = createReadStream(sourcePath);
	const writeStream = createWriteStream(destPath);

	const unzip = createUnzip();

	readStream.on("close", deleteFile(sourcePath));

	await pipeline(readStream, unzip, writeStream);
};

decompress().catch((err) => {
	throw new Error(err);
});

function deleteFile(path) {
	return function () {
		rm(path, (err) => {
			if (err) console.error("Failed to delete source file");
		})
	}
}