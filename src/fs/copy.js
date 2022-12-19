import { createReadStream, createWriteStream } from 'node:fs';
import { resolve, basename } from 'node:path';

export const copyFile = async (currentDirectory, pathOptions) => {
  try {
    const oldName = pathOptions.split(' ')[0];
    const newDir = pathOptions.split(' ')[1];
    const oldPath = resolve(currentDirectory, oldName);
    const newPath = resolve(currentDirectory, newDir, basename(oldName));

    const input = createReadStream(oldPath, 'utf-8');
    const output = createWriteStream(newPath);
    input.on('data', chunk => output.write(chunk));
  } catch (err) {
    console.log(err);
    console.log('11111 Problem with COPY file');
  }
};