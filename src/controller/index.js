import { readFile, createFile, renameFile, copyFile, moveFile, removeFile } from '../fs/index.js';
import { ls, cd, up } from '../navigation/index.js';
import { homedir } from 'node:os';
import { osCommandHandler } from '../os_info/index.js';
import { getHash } from '../hash/index.js';
import { zipHandler } from '../zlib/index.js';

const { stdin, stdout } = process;

const userHomeDir = homedir();
export let currentDir = userHomeDir;

const printMessage = async () => {
  const messageCurrentDir = `\nYou are currently in ${currentDir}\n`;
  stdout.write(messageCurrentDir);
};

const getCommandOptions = (argv) => {
  let options = '';
  let command = '';
  if (argv.startsWith('up') || argv.startsWith('ls') || argv.startsWith('.exit')) {
    return { command: argv, options };
  }

  if (argv.startsWith('os')) {
    const options = argv.replace('os', '').trim();
    return {command: 'os', options };
  }

  if (argv.startsWith('cd ')
    || argv.startsWith('rn ')
    || argv.startsWith('cp ')
    || argv.startsWith('mv ')
    || argv.startsWith('rm ')
  ) {
    options = argv.slice(3).trim();
    command = argv.slice(0, 2);
  }

  if (argv.startsWith('cat ') || argv.startsWith('add ')) {
    options = argv.slice(4).trim();
    command = argv.slice(0, 3);
  }

  if (argv.startsWith('compress ') || argv.startsWith('decompress ')) {
    options = argv.split(' ').slice(1).join(' ').trim();
    command = argv.split(' ')[0];
  }

  if (argv.startsWith('hash ')) {
    options = argv.slice(5).trim();
    command = argv.slice(0, 4);
  }

  return { command, options };
};

export const commandHandler = async (argv) => {
  try {
    const { command, options } = getCommandOptions(argv);
    switch (command) {
      case '.exit' : process.exit();
      break;
      case 'up' : currentDir = await up(currentDir);
        await printMessage();
      break;
      case 'ls' : await ls(currentDir);
        await printMessage();
      break;
      case 'cd' : await cd(currentDir, options)
        .catch(() => {
          stdout.write('You wrote invalid path\n');
          return currentDir;
        })
        .then(path => currentDir = path)
        await printMessage();
      break;
      case 'cat' : await readFile(options);
        await printMessage();
      break;
      case 'add' : await createFile(currentDir, options);
        await printMessage();
      break;
      case 'rn' : await renameFile(options);
        await printMessage();
      break;
      case 'cp' : await copyFile(options);
        await printMessage();
      break;
      case 'mv' : await moveFile(options);
        await printMessage();
      break;
      case 'rm' : await removeFile(options);
        await printMessage();
      break;
      case 'os' : await osCommandHandler(options);
        await printMessage();
      break;
      case 'hash' : await getHash(options);
        await printMessage();
      break;
      case 'compress' : await zipHandler(command, options);
        await printMessage();
      break;
      case 'decompress' : await zipHandler(command, options);
        await printMessage();
      break;
      default: console.log('Invalid command, please print correct command!');
    }
  } catch (err) {
    console.log('Operation failed', err);
  }
};