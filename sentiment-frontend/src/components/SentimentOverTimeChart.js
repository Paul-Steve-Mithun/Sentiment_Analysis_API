import React, { forwardRef } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";

const SentimentOverTimeChart = forwardRef(({ results }, ref) => {
  const data = results.map((item) => ({
    timestamp: new Date(item.timestamp).toLocaleDateString(),
    sentiment: item.sentiment,
    score: item.score,
  }));

  return (
    <div className="chart-container" ref={ref}>
      <h2>Sentiment Over Time Frame</h2>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{ top: 40, right: 60, left: 15, bottom: 40 }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="score" stroke="#ff7300" />
      </LineChart>
    </div>
  );
});

export default SentimentOverTimeChart;
