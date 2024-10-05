import { parentPort } from 'worker_threads';

const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

// принимаем сообщение от мастера
parentPort.on("message", (n) => {
	try {
		const result = nthFibonacci(n);
		/* uncomment if you want to see how it works with errors
		 * const m = Math.ceil(Math.random() * 10)
		 * if (m === 10) throw new Error(); */
		sendResult({ status: "resolved", data: result });
	} catch {
		sendResult({ status: "error", data: null });
	}
})

const sendResult = (result) => {
	parentPort.postMessage(result);
};

sendResult();