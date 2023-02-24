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
    <div className="h-3/4 w-3/4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ bottom: 12 }}>
          <CartesianGrid strokeDasharray="2 4" />
          <XAxis
            dataKey="date"
            fontSize=".5rem"
            angle={20}
            dx={5}
            tickMargin={12}
          />
          <YAxis fontSize=".5rem" type="number" domain={["auto", "auto"]} />
          <Tooltip />
          <Legend margin={{ left: 12, right: 12 }} fontSize=".5rem" />
          {Object.keys(lineColors).map((key) => {
            return (
              <Line
                type="monotone"
                dataKey={key}
                stroke={lineColors[key as ChartLines]}
                strokeWidth={2}
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
