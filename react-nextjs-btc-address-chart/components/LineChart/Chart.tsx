import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { RowData } from "../../pages/api/btc-addresses";

const data = [
  {
    date: "Jan 2023",
    over1K: 10,
    over10K: 0,
    over100K: 0,
    over1M: 0,
    over10M: 0,
  },
  {
    date: "Feb 2023",
    over1K: 20,
    over10K: 10,
    over100K: 0,
    over1M: 0,
    over10M: 0,
  },
  {
    date: "March 2023",
    over1K: 30,
    over10K: 15,
    over100K: 4,
    over1M: 0,
    over10M: 0,
  },
  {
    date: "April 2023",
    over1K: 33,
    over10K: 30,
    over100K: 10,
    over1M: 2,
    over10M: 1,
  },
  {
    date: "May 2023",
    over1K: 60,
    over10K: 40,
    over100K: 20,
    over1M: 9,
    over10M: 5,
  },
  {
    date: "June 2023",
    over1K: 120,
    over10K: 33,
    over100K: 15,
    over1M: 23,
    over10M: 10,
  },
];

interface Props {
  data: RowData[];
}

export const Chart = ({ data }: Props) => {
  const keys = Object.keys(data[0]);
  return (
    <div className="h-96 w-3/4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" fontSize=".5rem" />
          <YAxis fontSize=".5rem" />
          <Tooltip />
          <Legend margin={{ left: 12, right: 12 }} fontSize=".5rem" />
          {keys.map((key) => {
            if (key !== "date") {
              return (
                <Line
                  type="monotone"
                  dataKey={key}
                  stroke="red" //make this more dynamic
                  strokeWidth={1}
                  dot={false}
                  isAnimationActive={false}
                />
              );
            }
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
export default Chart;
