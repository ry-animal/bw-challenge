import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { RowData } from "../../pages/api/btc-addresses";
import Chart from "./Chart";

const timeFrames = ["ALL", "1M", "3M", "12M", "YTD"] as const;
type TimeFrame = typeof timeFrames[number];

interface Props {
  data: RowData[];
}

// https://blog.logrocket.com/top-8-react-chart-libraries/
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

  return (
    <>
      <section className="flex flex-col items-center justify-center my-4">
        <Chart data={filtered} />
        <div className="flex flex-row mt-4 px-3 gap-3">
          {timeFrames.map((timeframe) => {
            return (
              <button
                key={timeframe}
                className={clsx(
                  "p-2 w-20 border border-slate-800 rounded-md bg-slate-300",
                  "transition duration-200",
                  "hover:bg-purple-200 hover:translate-y-1",
                  `${activeFilter === timeframe && "bg-purple-400"}`
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
      </section>
    </>
  );
}

export default chartBuilder;
