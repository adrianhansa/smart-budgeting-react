import React from "react";

import Chart from "react-google-charts";

const MyChart = ({ accountName, expense, budget }) => {
  const data = [
    ["Account Name", "Spent so far", "Allocated Budget"],
    [accountName, Number(expense), budget],
  ];
  return (
    <div>
      <Chart
        // width={300}
        height={80}
        chartType="BarChart"
        loader={<div>Loading Chart</div>}
        data={data}
        options={{
          chartArea: { width: "65%" },
        }}
        rootProps={{ "data-testid": "1" }}
      />
    </div>
  );
};

export default MyChart;
