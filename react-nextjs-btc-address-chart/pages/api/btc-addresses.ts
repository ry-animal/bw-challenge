import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { readFileSync } from "fs";

export interface RowData {
  date: string;
  over1K: number;
  over10K: number;
  over100K: number;
  over1M: number;
  over10M: number;
}

export default async (_: NextApiRequest, res: NextApiResponse) => {
  function sanitizeCsvFile() {
    const dataDirectory = path.join(process.cwd(), "data");
    const CSV_FILE_PATH = `${dataDirectory}/Coin_Metrics_Network_Data_2023-02-02T14-32.csv`;
    const readFileCsv = readFileSync(CSV_FILE_PATH, "utf-8");

    //Remove null characters, double quotes, and split on new lines
    const sanitizedContents = readFileCsv
      .replace(/^\uFEFF/, "")
      .replace(/\0/g, "")
      .replace(/"/g, "");

    return sanitizedContents.split(/\r?\n/);
  }

  const sanitizedCsvArray = sanitizeCsvFile();

  // Get rid of the header row
  sanitizedCsvArray.shift();

  const data = sanitizedCsvArray.map((row) => {
    const rowsFromTabs = row.split("\t");
    const rowData: RowData = {
      date: rowsFromTabs[0],
      over1K: parseInt(rowsFromTabs[1]),
      over10K: parseInt(rowsFromTabs[2]),
      over100K: parseInt(rowsFromTabs[3]),
      over1M: parseInt(rowsFromTabs[4]),
      over10M: parseInt(rowsFromTabs[5]),
    };
    return rowData;
  });

  res.status(200).json(data);
};
