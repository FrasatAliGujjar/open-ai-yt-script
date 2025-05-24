"use client";

import { useState } from "react";

interface SummaryResult {
  summary: string;
  transcript: string;
}

export default function Agent() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<SummaryResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const res = await fetch(
      "https://open-ai-yt-script-backend.up.railway.app/summarize",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      }
    );
    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
            YouTube Video Summarizer
          </h1>
          <p className="text-gray-600">
            Get instant summaries of any YouTube video
          </p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Enter YouTube URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-lg p-3 pl-4 pr-12 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            <button
              onClick={handleSubmit}
              disabled={loading || !url}
              className={`absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                loading || !url
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Summarize"
              )}
            </button>
          </div>
        </div>

        {result && (
          <div className="mt-8 space-y-6 bg-gray-50 rounded-lg p-6">
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  Summary
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {result.summary}
                </p>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  Transcript
                </h2>
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <pre className="text-sm text-gray-700 whitespace-pre-wrap max-h-96 overflow-y-auto">
                    {result.transcript}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
