import React from "react";

export default function DownloadResult() {
  const handleDownload = () => {
    window.open("http://localhost:5000/api/download", "_blank");
  };

  return (
    <div className="mt-4">
      <button
        onClick={handleDownload}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Download Processed CSV
      </button>
    </div>
  );
}