/* File: src/components/FileUpload.js */
import React, { useState } from "react";
import axios from "axios";

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [downloadLink, setDownloadLink] = useState(null);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first.");
    setLoading(true);
    const formData = new FormData();
    formData.append("csvFile", file);

    try {
      const response = await axios.post("http://localhost:5000/api/upload", formData);
      if (response.status === 200) {
        setDownloadLink("http://localhost:5000/api/download");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Upload failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center w-full">
      <div className="border-2 border-dashed border-gray-400 p-6 rounded-lg w-full mb-4">
        <input type="file" onChange={handleFileChange} className="w-full text-center" />
      </div>
      <button
        onClick={handleUpload}
        disabled={loading}
        className={`w-full py-3 rounded-lg text-white font-semibold transition-all ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-700"}`}
      >
        {loading ? "Processing..." : "Upload & Analyze"}
      </button>
      {downloadLink && (
        <button
          onClick={() => window.open(downloadLink, "_blank")}
          className="w-full mt-4 py-3 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-700"
        >
          Download Processed File
        </button>
      )}
    </div>
  );
}
