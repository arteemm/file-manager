import { createReadStream } from 'node:fs';
import { resolve } from 'node:path';
import { stdout } from 'node:process';
const { createHash } = await import('node:crypto');

export const getHash = async (path) => {
  try {
    const pathToFile = resolve(path);

    const hash = createHash('sha256');
    const input = createReadStream(pathToFile);
    input.pipe(hash).setEncoding('hex').pipe(stdout);
    input.on('end', () => stdout.write('\n'));
    input.on('error', () => console.log(`no such file ${pathToFile}`) );
  } catch (err) {
    console.log(err);
  }
};
