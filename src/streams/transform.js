import { Transform } from 'node:stream';
import { EOL } from 'node:os';

class Reverse extends Transform {
	_transform(chunk, encoding, callback) {
		const reversed = chunk.toString().trim().split("").reverse().join("");
		this.push(`${reversed}${EOL}`);
		callback();
	}
}

const transform = async () => {
	const reverse = new Reverse();
  process.stdin.pipe(reverse).pipe(process.stdout);
};

await transform();