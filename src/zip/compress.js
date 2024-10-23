import { createReadStream, createWriteStream, rm } from "node:fs";
import { join } from "node:path";
import { pipeline } from "node:stream/promises";
import { createGzip } from "node:zlib";

const dirname = import.meta.dirname;

const compress = async () => {
    const sourcePath = join(dirname, "files", "fileToCompress.txt");
    const distPath = join(dirname, "files", "archive.gz");
		const readStream = createReadStream(sourcePath);
		const writeStream = createWriteStream(distPath);

		const gzip = createGzip();

		readStream.on("close", deleteFile(sourcePath));

		await pipeline(readStream, gzip, writeStream);
};

compress().catch((err) => {
	throw new Error(err);
});

function deleteFile(path) {
	return function () {
		rm(path, (err) => {
			if (err) console.error("Failed to delete source file");
		})
	}
}