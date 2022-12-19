import { createBrotliDecompress, createBrotliCompress } from 'node:zlib';
import { pipeline } from 'node:stream';
import { createReadStream, createWriteStream } from 'node:fs';
import { resolve } from 'node:path';

const compressFile = async (pathFile, pathArchive) => {
  const gzip = createBrotliCompress();

  const source = createReadStream(pathFile);
  const destination = createWriteStream(pathArchive);
  
  
  pipeline(source, gzip, destination, (err) => {
    if (err) {
      console.error('An error occurred:');
      process.exitCode = 1;
    }
  }); 
};

const decompressFile = async (pathFile, pathArchive) => {
  const gzip = createBrotliDecompress();

  const source = createReadStream(pathFile);
  const destination = createWriteStream(pathArchive);
  
  
  pipeline(source, gzip, destination, (err) => {
    if (err) {
      console.error('An error occurred:');
      process.exitCode = 1;
    }
  }); 
};

export const zipHandler = async (command, options) => {
  console.log(options);
  const pathFile = resolve(options.split(' ')[0]);
  const pathArchive = resolve(options.split(' ')[1]);
  // console.log( pathArchive, pathFile);
  try {
    if (command === 'compress') {
      await compressFile(pathFile, pathArchive);
    } else if (command === 'decompress') {
      await decompressFile(pathFile, pathArchive);
    }
  } catch (err) {
    console.log(err);
  }
};