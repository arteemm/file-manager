import { readdir, access } from 'node:fs/promises';
import { resolve, parse, isAbsolute } from 'node:path';

export const ls = async (path) => {
  try {
    const files = await readdir(path, { withFileTypes: true });
    const arrFiles = files.reduce((acc, item) => {
      if (item.isDirectory()) {
        acc[0].push({name: item.name, type: 'directory'});
      } else if (item.isFile()) {
        acc[1].push({name: item.name, type: 'file'});
      }
      return acc;
    }, [[], []]);
    const sortArray = arrFiles.reduce((acc, item) => {
      acc.push(...item.sort((a, b) => a.name.toLowerCase() - b.name.toLowerCase()));
      return acc;
    }, []);
    console.table(sortArray);
  } catch (err) {
    console.error(err);
  }
};

export const cd = async (currentDir, path) => {
  try {
    let resolvePath = resolve(path);
    if (!isAbsolute(path)) {
      resolvePath = resolve(currentDir, path);
    }
    await access(resolvePath);
    return resolvePath;
  } catch (err) {
    throw new Error(err);
  }
};

export const up = async (dir) => parse(dir).dir;