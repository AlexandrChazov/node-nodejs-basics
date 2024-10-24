import { parentPort } from 'node:worker_threads';

const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

// принимаем сообщение от мастера
parentPort.on("message", (n) => {
	try {
		/* uncomment if you want to see how it works with errors
		 * const m = Math.ceil(Math.random() * 10)
		 * if (m === 10) throw new Error(); */
		const result = nthFibonacci(n);
		parentPort.postMessage({ status: "resolved", data: result });
	} catch {
		parentPort.postMessage({ status: "error", data: null });
	}
})
