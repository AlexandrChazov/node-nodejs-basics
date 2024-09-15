import { createReadStream, createWriteStream } from "fs";
import { createGzip } from "zlib";
const compress = async () => {
    const sourcePath = `${import.meta.dirname}/files/fileToCompress.txt`;
    const distPath = `${import.meta.dirname}/files/archive.gz`;
		const gzip = createGzip();
		const readStream = createReadStream(sourcePath);
		const writeStream = createWriteStream(distPath);

		function handleError(err) {
			console.log("Finished with error...");
			readStream.destroy();
			writeStream.end("Finished with error...");
		}

		readStream
			.on("error", handleError)
			.pipe(gzip)
			.pipe(writeStream)
			.on("error", handleError);
};

await compress();