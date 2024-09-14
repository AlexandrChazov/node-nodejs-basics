const parseArgs = () => {
		let result = "";
		const args = process.argv;
		for (let i = 0; i < args.length; i++) {
			if (args[i].slice(0,2) === "--") {
				result = `${result}${args[i].slice(2)} is ${args[i+1]}; `
			}
		}
		if (result) console.log(result);
};

parseArgs();