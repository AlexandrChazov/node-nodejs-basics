import { createReadStream } from "fs";
import { createHash } from "crypto";
const calculateHash = async () => {
	const filePath = `${import.meta.dirname}/files/fileToCalculateHashFor.txt`
  const readStream = createReadStream(filePath);
	const hash = createHash("sha256");

	readStream.on("data", (buffer) => {
		hash.update(buffer);
	})
	readStream.on("error", () => {
		console.log("Something went wrong");
	})
	readStream.on("end", () => {
		console.log(hash.digest("hex"));
	})
};

await calculateHash();