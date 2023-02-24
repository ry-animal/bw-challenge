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

interface Props {
  data: RowData[];
}

type ChartLines = Exclude<keyof RowData, keyof { date: string }>;

export const Chart = ({ data }: Props) => {
  const lineColors: Record<ChartLines, string> = {
    over1K: "red",
    over10K: "blue",
    over100K: "green",
    over1M: "orange",
    over10M: "purple",
  };

  return (
    <div className="h-96 w-3/4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" fontSize=".5rem" />
          <YAxis fontSize=".5rem" />
          <Tooltip />
          <Legend margin={{ left: 12, right: 12 }} fontSize=".5rem" />
          {Object.keys(lineColors).map((key) => {
            return (
              <Line
                type="monotone"
                dataKey={key}
                stroke={lineColors[key as ChartLines]}
                strokeWidth={1}
                dot={false}
                isAnimationActive={false}
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
export default Chart;
