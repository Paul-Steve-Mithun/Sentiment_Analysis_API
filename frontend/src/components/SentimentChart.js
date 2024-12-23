import React, { forwardRef } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const SentimentChart = forwardRef(({ results }, ref) => {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];
  const sentimentData = results.reduce((acc, item) => {
    acc[item.sentiment] = (acc[item.sentiment] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(sentimentData).map((key) => ({
    name: key,
    value: sentimentData[key],
  }));

  return (
    <div className="chart-container" ref={ref}>
      <h2>Sentiment Analysis Chart</h2>
      <PieChart width={300} height={300}>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
});

export default SentimentChart;
