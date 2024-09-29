'use client';
import React, { useEffect, useRef, useState } from "react";
import { Upload, Play, FastForward, Camera, Zap } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface VideoData {
  codec: string;
  fileSize: number;
  resolution: string;
  duration: number;
  bitrate: number;
  framerate: number;
}

export default function Home() {
  const [video, setVideo] = useState("");
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [processedVideo, setProcessedVideo] = useState("");
  const [processedVideoData, setProcessedVideoData] = useState<VideoData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const processedVideoRef = useRef<HTMLVideoElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const fileSizeInBytes = useRef(0);

  const processVideo = async (file: File) => {
    setIsProcessing(true);
    setUploadProgress(0);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5328/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const processedFileURL = `http://localhost:5328/api/processed/${data.processed_filename}`;
        setProcessedVideo(processedFileURL);
        setProcessedVideoData(data.processed_info);
        setVideoData(data.original_info);
      } else {
        console.error("Error processing video:", response.statusText);
      }
    } catch (error) {
      console.error("Error uploading video:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (isProcessing) {
      const interval = setInterval(() => {
        setUploadProgress((prev) => (prev >= 95 ? 95 : prev + 5));
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isProcessing]);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-gray-100">
      <main className="container mx-auto p-8">
        <header className="mb-16 text-center">
          <h1 className="text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            Mirage AI
          </h1>
          <p className="text-xl max-w-2xl mx-auto text-gray-300 font-light leading-relaxed">
            Revolutionizing CCTV footage management with AI-powered video optimization. Identify crucial moments, reduce file sizes, and enhance surveillance efficiency.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Original Video */}
          <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:shadow-purple-500/20 border border-gray-700">
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-4 flex items-center text-blue-400">
                <Camera className="mr-2" size={28} />
                Original Footage
              </h2>
              {video ? (
                <video className="w-full h-80 rounded-lg object-cover" controls src={video} ref={videoRef}></video>
              ) : (
                <div
                  onClick={() => input.current && input.current.click()}
                  className="border-2 border-dashed border-gray-600 h-80 flex flex-col items-center justify-center rounded-lg cursor-pointer hover:bg-gray-700/50 transition-colors duration-300"
                >
                  <Upload className="mb-4 text-gray-400" size={48} />
                  <span className="text-sm text-gray-400 text-center px-4">
                    Click to select a video<br />or drop it here
                  </span>
                </div>
              )}
            </div>
            {videoData && (
              <div className="px-6 pb-6 grid grid-cols-2 gap-4 text-sm text-gray-400">
                <p>File size: {(videoData.fileSize / (1024 * 1024)).toFixed(2)} MB</p>
                <p>Codec: {videoData.codec}</p>
                <p>Resolution: {videoData.resolution}</p>
                <p>Duration: {formatDuration(videoData.duration)}</p>
                <p>Bitrate: {(videoData.bitrate / 1000000).toFixed(2)} Mbps</p>
                <p>Framerate: {videoData.framerate.toFixed(2)} fps</p>
              </div>
            )}
          </div>

          {/* Processed Video */}
          <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:shadow-purple-500/20 border border-gray-700">
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-4 flex items-center text-pink-400">
                <Zap className="mr-2" size={28} />
                AI-Optimized Footage
              </h2>
              {processedVideo ? (
                <video className="w-full h-80 rounded-lg object-cover" controls src={processedVideo} ref={processedVideoRef}></video>
              ) : (
                <div className="border-2 border-dashed border-gray-600 h-80 flex items-center justify-center rounded-lg">
                  <span className="text-sm text-gray-400">Awaiting video processing</span>
                </div>
              )}
            </div>
            {processedVideoData && (
              <div className="px-6 pb-6 grid grid-cols-2 gap-4 text-sm text-gray-400">
                <p>File size: {(processedVideoData.fileSize / (1024 * 1024)).toFixed(2)} MB</p>
                <p>Codec: {processedVideoData.codec}</p>
                <p>Resolution: {processedVideoData.resolution}</p>
                <p>Duration: {formatDuration(processedVideoData.duration)}</p>
                <p>Bitrate: {(processedVideoData.bitrate / 1000000).toFixed(2)} Mbps</p>
                <p>Framerate: {processedVideoData.framerate.toFixed(2)} fps</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center mb-12">
          <button
            onClick={() => input.current && input.current.click()}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 disabled:opacity-50 text-lg"
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Select Video for AI Optimization'}
          </button>
          {isProcessing && (
            <div className="w-64 bg-gray-700 rounded-full h-2 mt-4 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-full transition-all duration-300 ease-out"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          )}
        </div>

        {isProcessing && (
          <Alert className="bg-purple-900 border-purple-700 text-purple-100">
            <AlertTitle className="text-white">AI Processing in Progress</AlertTitle>
            <AlertDescription>
              Our advanced AI is analyzing your footage, identifying key moments, and optimizing file size. This may take a few moments.
            </AlertDescription>
          </Alert>
        )}

        <input
          ref={input}
          onChange={(e) => {
            if (e.target.files) {
              const file = e.target.files[0];
              fileSizeInBytes.current = file.size;
              const url = URL.createObjectURL(file);
              setVideo(url);
              processVideo(file);
            }
          }}
          type="file"
          className="hidden"
          accept="video/*"
        />
      </main>
      <footer className="text-center text-gray-500 text-sm py-8">
        © 2024 Mirage AI. Transforming video surveillance with cutting-edge artificial intelligence.
      </footer>
    </div>
  );
}
