import React, { useState, useRef } from "react";
import axios from "axios";

const FileUploader = ({ setAnalysisResults }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fileInputRef = useRef();

  const handleCardClick = (e) => {
    e.stopPropagation();
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    if (!file) {
      alert("Please select a CSV file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "https://sentimentanalysisapi.vercel.app/upload_csv?api_key=your_api_key",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.results) {
        setAnalysisResults(response.data.results);
      } else {
        throw new Error("Invalid response from server.");
      }
    } catch (error) {
      console.error("Error uploading file:", error.response?.data || error.message);
      setError("Failed to upload file. Please check the server or the file format.");
    } finally {
      setLoading(false);
      setFile(null);
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="file-uploader">
      <div className="upload-card" onClick={handleCardClick}>
        <p>Click here to upload a CSV file for sentiment analysis.</p>
      </div>

      <input
        type="file"
        accept=".csv"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      {file && <p>Selected File: {file.name}</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button onClick={uploadFile} disabled={loading}>
        {loading ? "Uploading..." : "Upload and Analyze"}
      </button>
    </div>
  );
};

export default FileUploader;
