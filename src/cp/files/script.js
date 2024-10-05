const args = process.argv.slice(2);

console.log(`Total number of arguments is ${args.length}`);
console.log(`Arguments: ${JSON.stringify(args)}`);

const echoInput = (chunk) => {
    const chunkStringified = chunk.toString();
    if (chunkStringified.includes('CLOSE')) process.exit(0);
    process.stdout.write(`Received from master process: ${chunk.toString()}`)
    // При использовании метода fork() мы можем обмениваться сообщениями следующим образом:
    // process.send(`${chunk.toString()}`)
};

process.stdin.on('data', echoInput);