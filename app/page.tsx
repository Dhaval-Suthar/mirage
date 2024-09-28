"use client";

import React, { useEffect, useRef, useState } from "react";

interface VideoInfoProps {
  video: HTMLVideoElement | null; // video can be an HTMLVideoElement or null
  fileSizeInBytes: React.MutableRefObject<number>;
  bitrateData: { timestamp: number; bitrate: number }[];
}

export default function Home() {
  const [video, setVideo] = useState("");
  const [processedVideo, setProcessedVideo] = useState("");

  const [rerender, setReRender] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const processedVideoRef = useRef<HTMLVideoElement>(null);

  const input = useRef<HTMLInputElement>(null);
  const fileSizeInBytes = useRef(0);

  const bitrateData = [
    { timestamp: 0, bitrate: 1000 },
    { timestamp: 1, bitrate: 2000 },
    { timestamp: 2, bitrate: 3000 },
    { timestamp: 3, bitrate: 4000 },
    { timestamp: 4, bitrate: 5000 },
    { timestamp: 5, bitrate: 6000 },
    { timestamp: 6, bitrate: 7000 },
    { timestamp: 7, bitrate: 8000 },
    { timestamp: 8, bitrate: 9000 },
    { timestamp: 9, bitrate: 10000 },
    { timestamp: 10, bitrate: 11000 },
    { timestamp: 11, bitrate: 12000 },
    { timestamp: 12, bitrate: 13000 },
    { timestamp: 13, bitrate: 14000 },
    { timestamp: 14, bitrate: 15000 },
    { timestamp: 15, bitrate: 16000 },
    { timestamp: 16, bitrate: 17000 },
    { timestamp: 17, bitrate: 18000 },
    { timestamp: 18, bitrate: 19000 },
    { timestamp: 19, bitrate: 20000 },
    { timestamp: 20, bitrate: 21000 },
    { timestamp: 21, bitrate: 22000 },
    { timestamp: 22, bitrate: 23000 },
    { timestamp: 23, bitrate: 24000 },
    { timestamp: 24, bitrate: 25000 },
    { timestamp: 25, bitrate: 26000 },
    { timestamp: 26, bitrate: 27000 },
    { timestamp: 27, bitrate: 28000 },
    { timestamp: 28, bitrate: 29000 },
    { timestamp: 29, bitrate: 30000 },
    { timestamp: 30, bitrate: 31000 },
    { timestamp: 31, bitrate: 32000 },
    { timestamp: 32, bitrate: 33000 },
    { timestamp: 33, bitrate: 34000 },
    { timestamp: 34, bitrate: 35000 },
    { timestamp: 35, bitrate: 36000 },
    { timestamp: 36, bitrate: 37000 },
    { timestamp: 37, bitrate: 38000 },
    { timestamp: 38, bitrate: 39000 },
    { timestamp: 39, bitrate: 40000 },
    { timestamp: 40, bitrate: 41000 },
  ];

  const processVideo = async (url: string) => {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    setProcessedVideo(url);
  };

  const handleMetadataLoaded = () => {
    if (videoRef.current) {
      setReRender(!rerender);
    }
  };

  return (
    <div className="antialiased bg-gray-50 dark:bg-gray-900">
      <main className="p-4 h-auto pt-20">
        <div className=" rounded-lg border-gray-300 dark:border-gray-600 h-60 mb-4">
          <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
              Mirage
            </span>{" "}
            AI.
          </h1>
          <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
            Our AI technology identifies important video clips in CCTV footage
            and reduces the size of the tape by removing unwanted data. This
            ensures that only the most relevant information is retained, making
            it easier to review and store surveillance videos efficiently.
          </p>
        </div>
        <div className="flex">
          <div className="w-1/2 flex justify-between p-2">
            <h1>Before Processing</h1>
            {video && (
              <button
                onClick={() => {
                  input.current && input.current.click();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="text-green-500 dark:text-green-400 h-5 w-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
              </button>
            )}
          </div>
          <div className="w-1/2 flex justify-between p-2">
            <h1>After Processing</h1>
            {processedVideo && (
              <a href={processedVideo} download="processed_video.mp4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="text-green-500 dark:text-green-400 h-5 w-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </svg>
              </a>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className=" border-gray-300 dark:border-gray-600 h-96">
            {video ? (
              <video
                className="w-full h-full"
                controls
                src={video}
                ref={videoRef}
                onLoadedMetadata={handleMetadataLoaded}
              ></video>
            ) : (
              <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-full flex justify-center">
                <button
                  onClick={() => input.current && input.current.click()}
                  type="button"
                  className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 my-auto h-10"
                >
                  Select a video
                </button>
              </div>
            )}
          </div>
          <input
            ref={input}
            onChange={(e) => {
              if (e.target.files) {
                const file = e.target.files[0];
                fileSizeInBytes.current = file.size;

                const url = URL.createObjectURL(file);
                setVideo(url);
                processVideo(url);
              }
            }}
            className="hidden"
            id="file_input"
            type="file"
            accept="video/*"
          />
          <div className="h-96">
            {video ? (
              processedVideo ? (
                <video className="w-full h-full" controls src={processedVideo} ref={processedVideoRef} onLoadedMetadata={handleMetadataLoaded}></video>
              ) : (
                <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-full flex justify-center">
                  <h3 className=" my-auto text-slate-100">Proccessing...</h3>
                </div>
              )
            ) : (
              <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-full flex justify-center">
                <h3 className=" my-auto text-slate-100">No video to process</h3>
              </div>
            )}
          </div>
          <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72">
            Before Process Image Statistics
            <VideoStats
              video={videoRef.current}
              bitrateData={bitrateData}
              fileSizeInBytes={fileSizeInBytes}
            />
          </div>
          <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72">
            After Process Image Statistics
            {/* need to replace video with processed video ref  */}
            <VideoStats
              video={processedVideoRef.current}
              bitrateData={bitrateData}
              fileSizeInBytes={fileSizeInBytes}
              />
          </div>
        </div>
      </main>
    </div>
  );
}

const VideoStats: React.FC<VideoInfoProps> = ({
  video,
  bitrateData,
  fileSizeInBytes,
}) => {
  if (!video) return null;

  const [resolution, setResolution] = useState({ width: 0, height: 0 });
  const [duration, setDuration] = useState(0);
  const [currentBitrate, setCurrentBitrate] = useState<number>(0);

  const updateBitrate = () => {
    // Get the current time of the video without decimals
    const currentTime = Math.floor(video.currentTime);

    // Find the bitrate based on the current timestamp
    const bitrate = bitrateData.find(
      (data: { timestamp: Number; bitrate: number }) =>
        data.timestamp === currentTime
    )?.bitrate;

    // Update the current bitrate state
    setCurrentBitrate(bitrate || 0);
  };

  useEffect(() => {
    video.addEventListener("timeupdate", updateBitrate);

    setResolution({
      width: video.videoWidth,
      height: video.videoHeight,
    });
    setDuration(video.duration);

    return () => {
      video.removeEventListener("timeupdate", updateBitrate);
    };
  }, [video]);

  useEffect(() => {}, [video]);
  return (
    <>
      <div>
        <p>Codec: </p>
        <p>
          File Size: {(fileSizeInBytes.current / 1024 / 1024).toFixed(3)} MB
        </p>
        <p>
          Resolution: {resolution.height} x {resolution.width}
        </p>
        <p>
          Duration:{" "}
          {duration > 60
            ? (duration / 60).toString() + " Minute"
            : duration.toString() + " Seconds"}{" "}
        </p>
        <p>Bitrate: {currentBitrate} Kbps</p>
      </div>
    </>
  );
};
