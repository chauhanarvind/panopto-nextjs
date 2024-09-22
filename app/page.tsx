"use client";

import { useState } from "react";

export default function DownloadForm() {
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("https://panopto.onrender.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (response.ok) {
        // Handle the file download
        const blob = await response.blob(); // Get the file as a blob
        const downloadUrl = window.URL.createObjectURL(blob); // Create a temporary URL for the file
        const a = document.createElement("a"); // Create a link element
        a.href = downloadUrl;
        a.download = "downloaded_video.mp4"; // Name of the downloaded file
        document.body.appendChild(a);
        a.click(); // Trigger the download
        a.remove(); // Remove the link element

        setMessage("Video downloaded successfully.");
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.error || "Failed to download video"}`);
      }
    } catch (error) {
      console.error("Error downloading video:", error);
      setMessage("Failed to download video.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="maincontainer">
      <h3>Make sure you are logged in to Panopto</h3>
      <form onSubmit={handleDownload}>
        <div className="form-control">
          <label htmlFor="url">media or m3u8 url</label>
          <input
            type="text"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter video URL"
            required
          />
        </div>
        <div className="form-control">
          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? "Downloading..." : "Download"}
          </button>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
