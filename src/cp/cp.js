import { spawn } from "child_process";
const spawnChildProcess = async (args) => {
	const child = spawn('node', ['src/cp/files/script.js', ...args], {
		stdio: ['pipe', 'pipe', 'pipe', 'ipc']
	});
	// Forward data from master process stdin to child process stdin
	process.stdin.pipe(child.stdin);

	// Forward data from child process stdout to master process stdout
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
