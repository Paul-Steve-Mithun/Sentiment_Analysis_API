import React from "react";
import SentimentChart from "./SentimentChart";
import SentimentOverTimeChart from "./SentimentOverTimeChart";

const Dashboard = ({ results }) => {
  return (
    <div className="dashboard">
      <h2>Sentiment Analysis Visualizations</h2>
      <div className="charts-container">
        <SentimentChart results={results} />
        <SentimentOverTimeChart results={results} />
      </div>
    </div>
  );
};

export default Dashboard;
