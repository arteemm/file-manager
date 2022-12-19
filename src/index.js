import { getUserName } from './userName/index.js';
import { commandHandler, currentDir } from './controller/index.js';
const { stdin, stdout } = process;


const messageCurrentDir = `You are currently in ${currentDir}`;

const userName = getUserName();

const startMessage = `Welcome to the File Manager, ${userName}!\n
${messageCurrentDir}\nPlease, print your command  `;


stdout.write(startMessage);

stdin.on('data', data => {
  const command = data.toString().trim();
  commandHandler(command);
});

process.on('exit', () => stdout.write(`\nThank you for using File Manager, ${userName}, goodbye!\n`));
process.on('SIGINT', () => process.exit());