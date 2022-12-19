import { getUserName } from './userName/index.js';
import { ls, cd } from './navigation/index.js';
const { stdin, stdout } = process;
//-----
import { homedir } from 'node:os';
import { parse } from 'node:path';

const userHomeDir = homedir();
let currentDir = userHomeDir;
const root = parse(userHomeDir).root;

const messageCurrentDir = `You are currently in ${currentDir}`;
//-----

// UP start
const up = (dir) => currentDir = parse(dir).dir;
// UP finish

const userName = getUserName();

const startMessage = `Welcome to the File Manager, ${userName}!\n
${messageCurrentDir}\n`;



stdout.write(startMessage);
stdin.on('data', data => {
  let command = data.toString().trim();
  let pathToDirectory = '';
  if (command.startsWith('cd ')) {
    pathToDirectory = command.slice(3).trim();
    command = 'cd';
  }

  switch (command) {
    case '.exit' : process.exit();
    break;
    case 'up' : up(currentDir);
    stdout.write(currentDir + '\n');
    break;
    case 'ls' : ls(currentDir);
    break;
    case 'cd' : cd(currentDir, pathToDirectory)
      .catch(() => {
        stdout.write('You wrote invalid path\n')
        return currentDir;
      })
      .then(path => currentDir = path)
      .then(() => stdout.write(currentDir + '\n'));
    break;
    default: console.log('WRONG');
  }
});
process.on('exit', () => stdout.write(`\nThank you for using File Manager, ${userName}, goodbye!`));
process.on('SIGINT', () => process.exit());