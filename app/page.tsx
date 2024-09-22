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
      console.log(url);
      const response = await fetch("https://panopto.onrender.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      // Ensure you're parsing the JSON response
      const data = await response.json();

      console.log(data);
      setMessage(data.message); // Set the message from the backend
      setLoading(false);
    } catch (error) {
      console.error("Error downloading video:", error);
      setMessage("Failed to download video.");
      setLoading(false);
    }
  };

  return (
    <div className="maincontainer">
      <h3>Make sure you are logged in to panopto</h3>
      <form onSubmit={handleDownload}>
        <div className="form-control">
          <label htmlFor="url">media or m3u8 url</label>
          <input
            type="text"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter YouTube video URL"
          />
        </div>
        <div className="form-control">
          <button className="btn-primary" type="submit">
            {loading ? "Downloading" : "Download"}
          </button>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
