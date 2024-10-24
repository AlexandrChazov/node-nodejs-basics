import { cpus } from "node:os";
import { Worker } from "node:worker_threads";

function startWorker(workers, n) {
	workers.push(
		new Promise((res) => {
			const worker = new Worker(`${import.meta.dirname}/worker.js`);
			console.log('КЛАСТЕР: Исполнитель %d запущен', worker.threadId);

			// отправляем сообщение воркеру
			worker.postMessage(n)
			// получаем сообщение от воркера
			worker.on("message", res)
			// обрабатываем ошибку
			worker.on("error", () => {
				res({ status: "error", data: null });
			})
		})
	)
}

const performCalculations = async () => {
	const workers = [];
	for (let i = 0; i < cpus().length; i++) {
		startWorker(workers, i + 10);
	}
	const result = await Promise.all(workers);
	console.log(result);
	process.exit();
};

await performCalculations();