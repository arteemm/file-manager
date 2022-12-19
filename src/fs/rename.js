import { rename } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';


export const renameFile = async (pathOptions) => {
  try {
    const oldName = pathOptions.split(' ')[0];
    const newName = pathOptions.split(' ')[1];
    const oldPath = resolve(oldName);
    const newPath = resolve(dirname(oldName), newName);

    await rename(oldPath, newPath);
  } catch {
    console.log('rename  file, Invalid path');
  }
};