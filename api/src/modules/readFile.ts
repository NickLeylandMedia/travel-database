import { createReadStream, read, readFile } from "fs";

import { parse } from "papaparse";

const readFileData = async (path: string) => {
  return await readFile(String(path), "utf-8", (err, data) => {
    if (err) {
      return { error: err };
    }
    return data;
  });
};

//Function to read file and return data as an object
const readAndParse = async (path: string) => {
  await readFile(String(path), "utf-8", (err, data) => {
    if (err) {
      return { error: err };
    }

    return parse(data, { header: true });
  });
};

export { readFileData, readAndParse };
