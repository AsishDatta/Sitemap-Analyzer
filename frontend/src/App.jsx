import React, { useState } from "react";

export default function App() {
  return (
    <div className="container">
      <h1 className="title">Sitemap Analyzer</h1>
      <div className="card">
        <FileUpload />
      </div>
    </div>
  );
}

function FileUpload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [downloadLink, setDownloadLink] = useState(null);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first.");
    setLoading(true);
    setTimeout(() => {
      setDownloadLink("http://localhost:5000/api/download");
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="upload-container">
      <label className="file-label">
        <span>Choose a CSV File</span>
        <input type="file" onChange={handleFileChange} className="hidden" />
      </label>
      <button
        onClick={handleUpload}
        disabled={loading}
        className={`upload-button ${loading ? "disabled" : "active"}`}
      >
        {loading ? "Processing..." : "Upload & Analyze"}
      </button>
      {downloadLink && (
        <a href={downloadLink} className="download-button" download>
          Download Processed File
        </a>
      )}
    </div>
  );
}
