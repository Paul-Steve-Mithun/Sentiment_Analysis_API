// import React, { useState } from "react";
// import FileUploader from "./components/FileUploader";
// import Dashboard from "./components/Dashboard"; // Import the Dashboard
// import ReportDownloader from "./components/ReportDownloader";
// import "./styles.css";

// function App() {
//   const [analysisResults, setAnalysisResults] = useState([]);

//   return (
//     <div className="app">
//       <h1>Sentiment Analysis Portal</h1>
//       <FileUploader setAnalysisResults={setAnalysisResults} />
//       {analysisResults.length > 0 && (
//         <>
//           <Dashboard results={analysisResults} /> {/* Use Dashboard here */}
//           <ReportDownloader results={analysisResults} />
//         </>
//       )}
//     </div>
//   );
// }

// export default App;


import React, { useState, useRef } from "react";
import FileUploader from "./components/FileUploader";
import SentimentChart from "./components/SentimentChart";
import SentimentOverTimeChart from "./components/SentimentOverTimeChart";
import ReportDownloader from "./components/ReportDownloader";
import "./styles.css";

function App() {
  const [analysisResults, setAnalysisResults] = useState([]);

  // Refs for charts
  const sentimentChartRef = useRef();
  const timeChartRef = useRef();

  return (
    <div className="app">
      <h1>Sentiment Analysis Portal</h1>
      <FileUploader setAnalysisResults={setAnalysisResults} />
      {analysisResults.length > 0 && (
        <>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            {/* Pie Chart */}
            <SentimentChart results={analysisResults} ref={sentimentChartRef} />
            {/* Time Chart */}
            <SentimentOverTimeChart results={analysisResults} ref={timeChartRef} />
          </div>
          <ReportDownloader
            results={analysisResults}
            sentimentChartRef={sentimentChartRef}
            timeChartRef={timeChartRef}
          />
        </>
      )}
    </div>
  );
}

export default App;
