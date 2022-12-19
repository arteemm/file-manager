import { rm } from 'node:fs/promises';
import { resolve } from 'node:path';

export const removeFile = async (path) => {
  try {
    const pathFile = resolve(path);
    console.log(path)
    await rm(pathFile);
  } catch (err) {
    console.error('wrong path');
  }
};