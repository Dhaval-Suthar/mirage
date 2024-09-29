'use client';
import React, { useState, useEffect } from 'react';
import { FileVideo, Upload, ArrowRight, CheckCircle, Download } from 'lucide-react';

const VideoCompressionAI = () => {
  const [originalSize, setOriginalSize] = useState(null);
  const [compressedSize, setCompressedSize] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processedFilename, setProcessedFilename] = useState(null);

  useEffect(() => {
    if (isProcessing) {
      const interval = setInterval(() => {
        setUploadProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prevProgress + 10;
        });
      }, 300);
      return () => clearInterval(interval);
    }
  }, [isProcessing]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setOriginalSize(file.size);
      setIsProcessing(true);
      setUploadProgress(0);

      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('http://localhost:5328/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Upload failed');
        }

        const data = await response.json();
        setCompressedSize(data.processed_info.file_size);
        setProcessedFilename(data.processed_filename);
        setIsProcessing(false);
        setIsComplete(true);
      } catch (error) {
        console.error('Error:', error);
        setIsProcessing(false);
      }
    }
  };

  const handleDownload = () => {
    if (processedFilename) {
      window.open(`http://localhost:5328/api/processed/${processedFilename}`, '_blank');
    }
  };

  const formatSize = (size) => {
    if (size < 1024) return size + ' B';
    else if (size < 1048576) return (size / 1024).toFixed(2) + ' KB';
    else return (size / 1048576).toFixed(2) + ' MB';
  };

    return (
      <div className="min-h-screen bg-black text-white font-sans antialiased">
      <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] opacity-20 blur-sm"></div>
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full space-y-16">
      <header className="text-center">
      <h1 className="text-6xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      TeamMirage
      </h1>
      <p className="text-xl text-gray-400 max-w-2xl mx-auto">
      Revolutionizing video compression with cutting-edge AI technology.
      </p>
      </header>

      <main className="bg-white bg-opacity-5 backdrop-filter backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-gray-800">
      <div className="mb-12">
      <label htmlFor="video-upload" className="block text-2xl font-semibold mb-6 text-center">
      Upload Your Video
      </label>
      <div className="relative group">
      <input
      id="video-upload"
      type="file"
      className="hidden"
      onChange={handleFileUpload}
      accept="video/*"
      />
      <label
      htmlFor="video-upload"
      className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-700 border-dashed rounded-2xl cursor-pointer group-hover:border-purple-500 transition-all duration-300 ease-in-out"
      >
      <div className="flex flex-col items-center justify-center pt-5 pb-6">
      <FileVideo className="w-16 h-16 mb-4 text-gray-500 group-hover:text-purple-500 transition-all duration-300 ease-in-out" />
      <p className="mb-2 text-sm text-gray-400 group-hover:text-white transition-all duration-300 ease-in-out">
      <span className="font-semibold">Click to upload</span> or drag and drop
      </p>
      <p className="text-xs text-gray-500 group-hover:text-gray-400 transition-all duration-300 ease-in-out">
      MP4, AVI, MOV (MAX. 1GB)
      </p>
      </div>
      </label>
      </div>
      </div>

      {isProcessing && (
        <div className="text-center space-y-4">
        <div className="w-full bg-gray-800 rounded-full h-2.5">
        <div
        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2.5 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${uploadProgress}%` }}
        ></div>
        </div>
        <p className="text-lg text-gray-400">AI Compression in Progress: {uploadProgress}%</p>
        </div>
      )}

      {isComplete && (
        <div className="mt-12 space-y-8">
        <h2 className="text-3xl font-bold text-center mb-8">Compression Results</h2>
        <div className="flex justify-between items-center">
        <div className="text-center">
        <p className="text-sm font-medium text-gray-500 mb-1">Original</p>
        <p className="text-4xl font-bold">{formatSize(originalSize)}</p>
        </div>
        <ArrowRight className="w-12 h-12 text-purple-500 mx-4" />
        <div className="text-center">
        <p className="text-sm font-medium text-gray-500 mb-1">Compressed</p>
        <p className="text-4xl font-bold text-green-500">{formatSize(compressedSize)}</p>
        </div>
        </div>
        <div className="text-center bg-gradient-to-r from-green-500 to-blue-500 p-6 rounded-xl">
        <p className="text-3xl font-bold mb-2">
        {((originalSize - compressedSize) / originalSize * 100).toFixed(2)}% Reduction
        </p>
        <p className="text-lg">Incredible AI-powered compression!</p>
        </div>
        <div className="flex items-center justify-center text-green-400 bg-green-900 bg-opacity-20 p-4 rounded-xl">
        <CheckCircle className="w-6 h-6 mr-2" />
        <span className="text-lg font-medium">Your optimized video is ready for download</span>
        </div>
        <button
        onClick={handleDownload}
        className="flex items-center justify-center w-full px-4 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
        <Download className="w-5 h-5 mr-2" />
        Download Compressed Video
        </button>
        </div>
      )}
      </main>

      <footer className="text-center text-gray-500 text-sm">
      © 2024 TeamMirage. Revolutionizing video compression with artificial intelligence.
      </footer>
      </div>
      </div>
      </div>
    );
};

export default VideoCompressionAI;
