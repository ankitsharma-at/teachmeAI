import React, { useState } from "react";
import axios from "axios";
import pdfParse from "pdf-parse";
import fs from 'browserify-fs';


const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      try {
        const arrayBuffer = await selectedFile.arrayBuffer();
        const parsedData = await pdfParse(Buffer.from(arrayBuffer));
        setText(parsedData.text);
      } catch (error) {
        console.error("Error parsing PDF:", error);
        alert("Failed to extract text from PDF. Please try again.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text) {
      alert("No text found in the PDF file. Please select a valid file.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/process-text", { text });
      setSummary(response.data.summary);
    } catch (error) {
      console.error("Error processing text:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-xl font-semibold text-gray-800 mb-4 text-center">Upload Your PDF</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 font-medium mb-2">Choose a PDF</label>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={loading}
          >
            {loading ? "Processing..." : "Send Text to Backend"}
          </button>
        </form>
        {summary && (
          <div className="mt-6 p-4 bg-gray-100 rounded-md">
            <h2 className="text-lg font-semibold text-gray-800">Summary:</h2>
            <p className="text-gray-600 mt-2">{summary}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
