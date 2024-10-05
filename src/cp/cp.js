import { spawn } from "child_process";
const spawnChildProcess = async (args) => {
	const child = spawn('node', ['src/cp/files/script.js', ...args]);

	// Передаём ввод в терминал родительского процесса дочернему
	process.stdin.pipe(child.stdin);

	// Передаём вывод в терминал дочернего процесса родительскому
	child.stdout.pipe(process.stdout);

	child.on('exit', (code) => {
		console.log(`Child process exited with exit code ${code}`);
	});
	child.on('error', (err) => {
		console.error("Something went wrong", err);
	});
};

// Put your arguments in function call to test this functionality
spawnChildProcess( ['hello', 'world']);
