import { Transform } from "stream";

class Reverse extends Transform {
	_transform(chunk, encoding, callback) {
		const reversed = chunk.toString().split("").reverse().join("");
		this.push(reversed);
		callback();
	}
}

const transform = async () => {
	const reverse = new Reverse();
  process.stdin.pipe(reverse).pipe(process.stdout);
};

await transform();