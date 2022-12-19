import { open } from 'node:fs/promises';
import { resolve } from 'node:path';

export const createFile = async (currentDirectory, filename) => {
  try {
    const path = resolve(currentDirectory, filename);
    await open(path, 'ax');
  } catch {
    console.log('FILE ALREADY HAS BEEN CREATE');
  }
};