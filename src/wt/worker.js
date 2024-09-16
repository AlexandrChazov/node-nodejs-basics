import { parentPort } from 'worker_threads';

const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

parentPort.on("message", (n) => {
	try {
		const result = nthFibonacci(n);
		sendResult({ status: "resolved", data: result });
	} catch {
		sendResult({ status: "error", data: null });
	}
})

const sendResult = (result) => {
	parentPort.postMessage(result);
};

sendResult();