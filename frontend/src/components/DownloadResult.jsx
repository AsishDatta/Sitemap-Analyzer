import React from "react";

const BACKEND_URL = "https://sitemap-analyzer-rr6e.onrender.com";

export default function DownloadResult() {
  const handleDownload = () => {
    window.open(`${BACKEND_URL}/api/download`, "_blank");
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