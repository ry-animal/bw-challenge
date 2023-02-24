import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { RowData } from "../pages/api/btc-addresses";

const timeFrames = ["ALL", "1M", "3M", "12M", "YTD"] as const;
type TimeFrame = typeof timeFrames[number];

interface Props {
  data: RowData[];
}

function chartBuilder({ data }: Props) {
  const [activeFilter, setActiveFilter] = useState<TimeFrame>("ALL");
  const [filtered, setFiltered] = useState(data);

  useEffect(() => {
    getFilter(activeFilter);
  }, [activeFilter]);

  const getFilter = (timeframe: TimeFrame) => {
    const filter = {
      ALL: () => setFiltered(data),
      "1M": () =>
        setFiltered(
          data.filter((d) => {
            const oneMonthAgo = new Date();
            oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
            return new Date(d.date) > oneMonthAgo;
          })
        ),
      "3M": () =>
        setFiltered(
          data.filter((d) => {
            const threeMonthsAgo = new Date();
            threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
            return new Date(d.date) > threeMonthsAgo;
          })
        ),
      "12M": () =>
        setFiltered(
          data.filter((d) => {
            const twelveMonthsAgo = new Date();
            twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);
            return new Date(d.date) > twelveMonthsAgo;
          })
        ),
      YTD: () => {
        const today = new Date().toISOString();
        const yearStart = new Date(
          new Date().getFullYear(),
          0,
          1
        ).toISOString();
        setFiltered(data.filter((d) => d.date >= yearStart && d.date <= today));
      },
    };
    return filter[timeframe]();
  };

  const chartData = filtered.map((d) => [
    {
      id: "Over 1K",
      data: [{ x: d.date, y: d.over1K }],
      color: "blue",
      key: "Over 1K",
    },
    {
      id: "Over 10K",
      data: [{ x: d.date, y: d.over10K }],
      color: "purple",
      key: "Over 10K",
    },
    {
      id: "Over 100K",
      data: [{ x: d.date, y: d.over100K }],
      color: "purple",
      key: "Over 100K",
    },
    {
      id: "Over 1M",
      data: [{ x: d.date, y: d.over1M }],
      color: "purple",
      key: "Over 1M",
    },
    {
      id: "Over 10M",
      data: [{ x: d.date, y: d.over10M }],
      color: "purple",
      key: "Over 10M",
    },
  ]);

  console.log(chartData);

  return (
    <div className="h-80">
      <div className="flex justify-center mt-4 px-4 gap-4">
        {timeFrames.map((timeframe) => {
          return (
            <button
              key={timeframe}
              className={clsx(
                "p-2 w-20 border w- border-slate-800 rounded-xl bg-slate-300",
                "transition duration-200",
                "hover:bg-blue-200 hover:translate-y-1 active:translate-y-1",
                `${activeFilter === timeframe && "bg-blue-400"}`
              )}
              onClick={() => {
                setActiveFilter(timeframe);
              }}
            >
              {timeframe}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default chartBuilder;
