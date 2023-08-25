import { parse } from "papaparse";

const parseData = async (data: any) => {
  const arr: any[] = [];
  const load = await parse(data, { header: true });
  load.data.forEach((item) => {
    arr.push(item);
  });
  return arr;
};

const parseAndLog = async (data: any) => {
  const arr = [];
  const load = await parseData(data);
};

export { parseData };
