import { cpus } from "os";
import { Worker } from "worker_threads";

function startWorker(n, workers) {
	const worker = new Worker(`${import.meta.dirname}/worker.js`);
	console.log('КЛАСТЕР: Исполнитель %d запущен', worker.threadId);
	worker.on("message", (result ) => {
		workers[worker.threadId - 1] = result;
		if (workers.every(worker => !!worker?.data)) {
			console.log(workers);
			process.exit();
		}
	})
	worker.on("error", () => {
		workers[worker.threadId - 1] = { status: "error", data: null };
	})
	worker.postMessage(n)
}

const performCalculations = async () => {
	let n = 10;
	const workers = new Array(cpus().length).fill(null);
	cpus().forEach(() => {
		startWorker(n, workers);
		n++;
	})
};

await performCalculations();