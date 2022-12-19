import { rename } from 'node:fs/promises';
import { resolve } from 'node:path';


export const renameFile = async (currentDir, pathOptions) => {
  try {
    const oldName = pathOptions.split(' ')[0];
    const newName = pathOptions.split(' ')[1];
    const oldPath = resolve(currentDir, oldName);
    const newPath = resolve(currentDir, newName);

    await rename(oldPath, newPath);
  } catch {
    console.log('1111111 Problem with rename');
  }
};