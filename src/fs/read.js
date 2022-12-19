import { createReadStream } from 'node:fs';
import { stdout } from 'process';
import { resolve } from 'node:path';

export const readFile = async (file) => {
  const path = resolve(file);
  const input = createReadStream(path, 'utf-8');
  input.on('data', chunk => stdout.write(chunk));
  input.on('error', err => console.log('Invalid path'));
}