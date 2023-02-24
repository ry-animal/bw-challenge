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

export const Chart = () => {
  return (
    <div className="h-96 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" fontSize=".5rem" />
          <YAxis />
          <Tooltip />
          <Legend margin={{ left: 12, right: 12 }} fontSize=".5rem" />
          <Line type="monotone" dataKey="over1K" stroke="red" />
          <Line type="monotone" dataKey="over10K" stroke="blue" />
          <Line type="monotone" dataKey="over100K" stroke="green" />
          <Line type="monotone" dataKey="over1M" stroke="purple" />
          <Line type="monotone" dataKey="over10M" stroke="black" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
export default Chart;
