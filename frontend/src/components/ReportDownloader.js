import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import "jspdf-autotable"; 

const ReportDownloader = ({ results, sentimentChartRef, timeChartRef }) => {
  const headers = [
    { label: "ID", key: "id" },
    { label: "Text", key: "text" },
    { label: "Sentiment", key: "sentiment" },
    { label: "Score", key: "score" },
    { label: "Timestamp", key: "timestamp" },
  ];

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth(); 

    const title = "Sentiment Analysis Report      ";
    const titleWidth = doc.getTextWidth(title);  
    const titleX = (pageWidth - titleWidth) / 2;  
    doc.setFontSize(18);
    doc.text(title, titleX, 20);

    html2canvas(sentimentChartRef.current, { backgroundColor: null }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const chartWidth = 140;  
      const chartX = (pageWidth - chartWidth) / 2;  
      doc.addImage(imgData, "PNG", chartX, 30, chartWidth, 120); 

      html2canvas(timeChartRef.current, { backgroundColor: null }).then((canvas) => {
        const timeChartImgData = canvas.toDataURL("image/png");
        const timeChartWidth = 140; 
        const timeChartX = (pageWidth - timeChartWidth) / 2;  
        doc.addImage(timeChartImgData, "PNG", timeChartX, 150, timeChartWidth, 100); 

        doc.addPage();

        const dataTitle = "Sentiment Analysis Data";
        const dataTitleWidth = doc.getTextWidth(dataTitle);  
        const dataTitleX = (pageWidth - dataTitleWidth) / 2;  
        doc.setFontSize(18);
        doc.text(dataTitle, dataTitleX, 20);  

        const tableData = results.map((result) => [
          result.id,
          result.text,
          result.sentiment,
          result.score,
          result.timestamp || "N/A",
        ]);

        doc.autoTable({
          startY: 30, 
          head: [headers.map((header) => header.label)], 
          body: tableData, 
        });

        doc.save("sentiment_analysis_report.pdf");
      });
    });
  };

  return (
    <div className="report-downloader">
      <button onClick={generatePDF} className="download-pdf-btn">
        Download Report as PDF
      </button>
    </div>
  );
};

export default ReportDownloader;
