import { createReadStream, createWriteStream, rm } from 'node:fs';
import { access } from 'node:fs/promises';
import { resolve, basename } from 'node:path';

export const moveFile = async (pathOptions) => {
  try {
    const oldName = pathOptions.split(' ')[0];
    const newDir = pathOptions.split(' ')[1];
    const oldPath = resolve(oldName);
    const newPath = resolve(newDir, basename(oldName));

    await access(oldPath);
    await access(newDir);

    const input = createReadStream(oldPath, 'utf-8');
    const output = createWriteStream(newPath, { flags: 'w+' });
    input.on('data', chunk => output.write(chunk));
    input.on('end', () => rm(oldPath, (err) => {
      if (err) console.log(err);
    }));
    input.on('error', () => console.log('read file, Invalid path'));
  } catch (err) {
    console.log('Move file, Invalid path');
  }
};