'use strict';

const ReadLine = require('readline');
const rl = ReadLine.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: false
});

rl.setPrompt('> ');
rl.prompt();

rl.on('line', reply => {
	console.log(`You said ${reply}`);
	rl.prompt();
})